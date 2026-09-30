import xss from "xss";

// xss is CommonJS: named imports fail under Node's ESM loader, so read them from the default export.
const {FilterXSS, safeAttrValue} = xss as unknown as typeof import("xss");

// Zero-width and word-joiner characters sometimes end up pasted in the feed links.
const invisibleChars = /[​-‍⁠﻿]/g;
const allowedUrl = /^(https?:|mailto:)/i;

const filter = new FilterXSS({
    whiteList: {
        p: [],
        br: [],
        hr: [],
        b: [],
        strong: [],
        i: [],
        em: [],
        u: [],
        ul: [],
        ol: [],
        li: [],
        a: ['href'],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style'],
    safeAttrValue(tag, name, value, cssFilter) {
        if (name === 'href') {
            value = value.replace(invisibleChars, '').trim();
            if (!allowedUrl.test(value)) {
                return '';
            }
        }

        return safeAttrValue(tag, name, value, cssFilter);
    },
});

/**
 * Sanitizes HTML coming from the podcast feed so it can be safely rendered with v-html. Only basic text markup and
 * http(s)/mailto links are kept, and web links are opened in a new tab without access to this window.
 */
export function sanitizeHtml(html: string): string {
    return filter.process(html)
        .replace(/<a href="(https?:[^"]*)">/gi, '<a href="$1" target="_blank" rel="noopener noreferrer">');
}
