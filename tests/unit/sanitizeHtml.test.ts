import {readFileSync} from "node:fs";
import {describe, expect, it} from "vitest";
import {sanitizeHtml} from "~/composables/sanitizeHtml";

const feed = readFileSync(new URL('../fixtures/feed.xml', import.meta.url), 'utf8');

describe('sanitizeHtml', () => {
    it.each([
        ['<p>a<script>alert(1)</script>b</p>', /script|alert/i],
        ['<img src=x onerror=alert(1)>', /img|onerror/i],
        ['<a href="javascript:alert(1)">x</a>', /javascript/i],
        ['<a href="JaVaScRiPt:alert(1)">x</a>', /javascript/i],
        ['<a href=" &#106;avascript:alert(1)">x</a>', /javascript|&#106;/i],
        ['<a href="data:text/html,<script>alert(1)</script>">x</a>', /data:|script/i],
        ['<a href="https://ok.es" onclick="alert(1)">x</a>', /onclick/i],
        ['<p style="background:url(javascript:alert(1))">x</p>', /style|javascript/i],
        ['<iframe src="https://evil.es"></iframe>', /iframe|evil/i],
        ['<svg><script>alert(1)</script></svg>', /svg|script/i],
        ['<a href="https://ok.es"" onmouseover="alert(1)">x</a>', /onmouseover/i],
    ])('neutralizes %s', (input, forbidden) => {
        expect(sanitizeHtml(input)).not.toMatch(forbidden);
    });

    it('keeps allowed markup and hardens web links', () => {
        expect(sanitizeHtml('<p><b>a</b><em>b</em><br><a href="https://x.es/?a=1">l</a><a href="mailto:s@x.es">m</a></p><hr>'))
            .toBe('<p><b>a</b><em>b</em><br><a href="https://x.es/?a=1" target="_blank" rel="noopener noreferrer">l</a><a href="mailto:s@x.es">m</a></p><hr>');
    });

    it('strips invisible characters from links', () => {
        expect(sanitizeHtml('<a href="⁠⁠https://cebrasdepaso.es">x</a>'))
            .toBe('<a href="https://cebrasdepaso.es" target="_blank" rel="noopener noreferrer">x</a>');
    });

    it('leaves real feed descriptions unchanged apart from link attributes', () => {
        const descriptions = [...feed.matchAll(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/g)].map((m) => m[1]);
        expect(descriptions.length).toBeGreaterThan(40);

        const normalize = (html: string) => html
            .replace(/[​-‍⁠﻿]/g, '')
            .replace(/\s(target|rel)="[^"]*"/g, '')
            .replace(/<br\s*\/?>/g, '<br>');

        for (const description of descriptions) {
            expect(normalize(sanitizeHtml(description))).toBe(normalize(description));
        }
    });
});
