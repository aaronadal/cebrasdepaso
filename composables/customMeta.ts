import type {ComputedRef, Ref} from "vue";
import {useSeoMeta} from "@unhead/vue";

type Meta<T> = T|Ref<T>|ComputedRef<T>|(() => T);

type CustomMeta = {
    title: Meta<string>,
    description: Meta<string>,
    type: Meta<'website'|'article'>,
    image: Meta<string>,
    imageWidth: Meta<number>,
    imageHeight: Meta<number>,
    imageType: Meta<'image/png'|'image/jpeg'|'image/gif'>,
    imageAlt: Meta<string>,
    robots: Meta<'noindex, nofollow'|'index, follow'>,
};

const defaults = {
    title: 'Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
    description: '',
    type: 'website',
    image: 'https://cebrasdepaso.es/cebrasdepaso-og.png',
    imageWidth: 1200,
    imageHeight: 627,
    imageType: 'image/png',
    imageAlt: '',
    robots: 'index, follow',
} as const;

export function useCustomMeta(meta: Partial<CustomMeta>|((defaultMeta: typeof defaults) => Partial<CustomMeta>)) {
    if(typeof meta === 'function') {
        meta = meta(defaults);
    }

    useSeoMeta({
        title: meta.title || defaults.title,
        ogTitle: meta.title || defaults.title,
        twitterTitle: meta.title || defaults.title,

        description: meta.description || defaults.description,
        ogDescription: meta.description || defaults.description,
        twitterDescription: meta.description || defaults.description,

        ogType: meta.type || defaults.type,
        ogLocale: 'es',
        ogSiteName: 'Cebras de paso',

        twitterCard: 'summary_large_image',
        msapplicationTileColor: '#ff9a57',

        ogImage: meta.image || defaults.image,
        twitterImage: meta.image || defaults.image,

        ogImageWidth: meta.imageWidth || defaults.imageWidth,
        ogImageHeight: meta.imageHeight || defaults.imageHeight,
        ogImageType: meta.imageType || defaults.imageType,

        ogImageAlt: meta.imageAlt || defaults.imageAlt,
        twitterImageAlt: meta.imageAlt || defaults.imageAlt,

        robots: meta.robots || defaults.robots,
    });
}
