import {readFileSync} from "node:fs";
import {describe, expect, it} from "vitest";
import {parsePodcast} from "~/composables/rss";

const feed = readFileSync(new URL('../fixtures/feed.xml', import.meta.url), 'utf8');

const channel = (items: string) => `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0"><channel>
<title><![CDATA[Cebras &amp; co]]></title>
${items}
</channel></rss>`;

describe('parsePodcast', () => {
    const podcast = parsePodcast(feed);

    it('reads every episode of the feed, newest first', () => {
        const counts = podcast.episodes.reduce<Record<string, number>>((acc, e) => ({...acc, [e.episodeType]: (acc[e.episodeType] || 0) + 1}), {});
        expect(counts).toEqual({full: 40, bonus: 4, trailer: 1});
        expect(podcast.episodes[0]).toMatchObject({episodeType: 'full', number: 40, title: 'Del futuro', duration: 4354});
        expect(podcast.episodes.at(-1)).toMatchObject({episodeType: 'trailer', number: 0, title: 'Esto es... CEBRAS DE PASO'});
    });

    it('gives every episode a unique type and number', () => {
        const keys = podcast.episodes.map((e) => `${e.episodeType}/${e.number}`);
        expect(new Set(keys).size).toBe(keys.length);
    });

    it('extracts media, artwork and summaries', () => {
        const [latest] = podcast.episodes;
        expect(latest.mediaUrl).toMatch(/^https:\/\/anchor\.fm\/.+\.mp3$/);
        expect(latest.mediaType).toBe('audio/mpeg');
        expect(latest.artworkSrc).toMatch(/^https:\/\/.+cloudfront\.net\//);
        expect(latest.fullSummary).toContain('<hr>');
        expect(latest.summary).not.toContain('<hr>');
        expect(latest.fullSummary.startsWith(latest.summary)).toBe(true);
    });

    it('splits the guest from the title', () => {
        const [episode] = parsePodcast(channel('<item><title><![CDATA[[#07] Solo uno (con Invitada)]]></title></item>')).episodes;
        expect(episode).toMatchObject({number: 7, title: 'Solo uno', guest: 'Invitada', episodeType: 'full'});
    });

    it.each([['01:12:34', 4354], ['12:34', 754], ['4354', 4354], ['', 0]])('parses duration %j as %i seconds', (duration, seconds) => {
        const [episode] = parsePodcast(channel(`<item><title>x</title><itunes:duration>${duration}</itunes:duration></item>`)).episodes;
        expect(episode.duration).toBe(seconds);
    });

    it('neutralizes html injected in the feed', () => {
        const poisoned = feed.replace('<description><![CDATA[',
            '<description><![CDATA[<p><img src=x onerror="alert(1)"><a href="javascript:alert(2)">x</a><script>alert(3)</script></p>');
        const html = parsePodcast(poisoned).episodes.map((e) => e.fullSummary + e.summary).join('');
        expect(html).not.toMatch(/onerror|javascript:|<script|<img/i);
    });
});
