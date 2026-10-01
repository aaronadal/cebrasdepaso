import {createHash} from "node:crypto";
import {defineNitroPlugin} from "nitropack/runtime";

const inlineScript = /<script(?![^>]*\ssrc=)(?![^>]*type="application\/(?:json|ld\+json)")[^>]*>([\s\S]*?)<\/script>/g;

function hash(script: string) {
    return `'sha256-${createHash('sha256').update(script).digest('base64')}'`;
}

/**
 * The header CSP (vercel.json) has to allow inline scripts because Nuxt inlines its runtime config. This adds a
 * second, stricter policy that only allows the exact inline scripts of the page. Browsers enforce both, so injected
 * scripts and inline event handlers are blocked. Hashes stay the same for every request of a build, so cached (ISR)
 * pages keep working, unlike nonces.
 */
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html) => {
        const parts = [...html.head, ...html.bodyPrepend, ...html.body, ...html.bodyAppend].join('');
        const hashes = [...parts.matchAll(inlineScript)].map(([, script]) => hash(script));

        html.head.unshift(`<meta http-equiv="Content-Security-Policy" content="script-src 'self' ${[...new Set(hashes)].join(' ')}">`);
    });
});
