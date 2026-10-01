import {readFileSync} from "node:fs";
import {describe, expect, it} from "vitest";
import {useTrackTitle} from "~/composables/media/trackTitle";

const feed = readFileSync(new URL('../fixtures/feed.xml', import.meta.url), 'utf8');
const track = (title: string) => ({title, mediaUrl: '', mediaType: '', artist: '', album: ''});
const format = (title: string) => useTrackTitle(track(title)).value;

describe('useTrackTitle', () => {
    it('keeps the line breaks of every real title', () => {
        const titles = [...feed.matchAll(/<item>[\s\S]*?<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/g)]
            .map((m) => m[1].replace(/^\[[*#»][0-9]+]\s/, '').replace(/\s\(con .*?\)$/, ''));

        expect(Object.fromEntries(titles.map((title) => [title, format(title)]))).toMatchSnapshot();
    });

    it('uses the custom titles as trusted html', () => {
        expect(format('Esto es... CEBRAS DE PASO')).toBe('Esto es...<br />CEBRAS DE PASO');
    });

    it.each([
        '<img src=x onerror=alert(1)>',
        'Un título bastante largo <img src=x onerror=alert(1)> con cosas',
    ])('escapes html in %s', (title) => {
        const output = format(title);
        expect(output).not.toMatch(/<img/);
        expect(output).toMatch(/&lt;img/);
    });

    it('does not move line breaks because of escaped characters', () => {
        expect(format("L'estiu i les coses que decimos cuando nadie").replace(/&#39;/g, "'"))
            .toBe(format("L’estiu i les coses que decimos cuando nadie").replace(/’/g, "'"));
    });
});
