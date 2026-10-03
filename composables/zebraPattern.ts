export const zebraPatternUrl = '/zebra-pattern.svg';
const zebraPatternId = 'zebra-pattern';

let pattern: Promise<Element> | null = null;

function loadZebraPattern(): Promise<Element> {
    pattern ??= fetch(zebraPatternUrl)
        .then((response) => response.text())
        .then((svg) => {
            const element = new DOMParser().parseFromString(svg, 'image/svg+xml').getElementById(zebraPatternId);
            if (!element) {
                throw new Error(`Missing #${zebraPatternId} in ${zebraPatternUrl}`);
            }

            return element;
        })
        .catch((error) => {
            pattern = null;
            throw error;
        });

    return pattern;
}

// html2canvas renders SVGs as images, which cannot load external <use> references,
// so the pattern is copied into the cloned document before it is rendered.
export async function inlineZebraPattern(document: Document): Promise<void> {
    const uses = document.querySelectorAll(`use[href="${zebraPatternUrl}#${zebraPatternId}"]`);
    if (uses.length === 0) {
        return;
    }

    const source = await loadZebraPattern();
    uses.forEach((use) => {
        const group = document.importNode(source, true) as Element;
        group.removeAttribute('id');

        const x = use.getAttribute('x') ?? '0';
        const y = use.getAttribute('y') ?? '0';
        const transform = `${use.getAttribute('transform') ?? ''} translate(${x} ${y})`.trim();
        group.setAttribute('transform', transform);

        use.replaceWith(group);
    });
}
