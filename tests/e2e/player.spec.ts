import type {Page} from "@playwright/test";
import {expect, test} from "./fixtures";

type PlayerState = {
    src: string | null,
    paused: boolean | null,
    time: number,
    icon: 'play' | 'pause' | '?',
    prevDisabled: boolean | null,
    nextDisabled: boolean | null,
};

function playerState(page: Page): Promise<PlayerState> {
    return page.evaluate(() => {
        const audio = document.querySelector<HTMLAudioElement>('#main-player audio');
        const buttons = [...document.querySelectorAll('#main-player .audio-player .play button')];
        const toggle = buttons.length === 3 ? buttons[1] : buttons[0];
        // Tell the play and pause icons apart by their path.
        const d = toggle?.querySelector('path')?.getAttribute('d') || '';

        return {
            src: audio?.getAttribute('src') || null,
            paused: audio ? audio.paused : null,
            time: audio?.currentTime || 0,
            icon: d.startsWith('M216') ? 'pause' : d.startsWith('M240') ? 'play' : '?',
            prevDisabled: buttons.length === 3 ? buttons[0].classList.contains('disabled') : null,
            nextDisabled: buttons.length === 3 ? buttons[2].classList.contains('disabled') : null,
        } as PlayerState;
    });
}

const mainPlayerButton = (page: Page, index: number) => page.locator('#main-player .audio-player .play button').nth(index);

test.describe.configure({mode: 'serial'});

test('the main player plays, navigates and follows the audio element', async ({page, problems}) => {
    await page.goto('/podcast');
    await page.locator('.episode-card .audio-player .play button').first().click();

    await expect.poll(() => playerState(page), {timeout: 30_000}).toMatchObject({paused: false, icon: 'pause', prevDisabled: true, nextDisabled: false});
    await expect.poll(async () => (await playerState(page)).time, {timeout: 30_000}).toBeGreaterThan(0.5);
    const first = await playerState(page);

    // Next plays the following episode.
    await mainPlayerButton(page, 2).click();
    await expect.poll(async () => {
        const s = await playerState(page);
        return s.src !== first.src && !s.paused && s.icon === 'pause' && s.time > 0.5;
    }, {timeout: 30_000}).toBe(true);

    // Pauses coming from outside the page (media keys, OS controls) are reflected.
    await page.evaluate(() => document.querySelector<HTMLAudioElement>('#main-player audio')!.pause());
    await expect.poll(() => playerState(page)).toMatchObject({paused: true, icon: 'play'});

    // The end of an episode stops and rewinds.
    await mainPlayerButton(page, 1).click();
    await expect.poll(async () => (await playerState(page)).paused).toBe(false);
    await page.evaluate(() => {
        const audio = document.querySelector<HTMLAudioElement>('#main-player audio')!;
        audio.currentTime = audio.duration - 1.5;
    });
    await expect.poll(async () => {
        const s = await playerState(page);
        return s.paused && s.icon === 'play' && s.time < 1;
    }, {timeout: 20_000}).toBe(true);
});

test('next is disabled on the last episode', async ({page, problems}) => {
    await page.goto('/podcast/avance/0');
    await page.locator('.episode-page .audio-player .play button').click();
    await expect.poll(() => playerState(page), {timeout: 30_000}).toMatchObject({paused: false, nextDisabled: true, prevDisabled: false});
});
