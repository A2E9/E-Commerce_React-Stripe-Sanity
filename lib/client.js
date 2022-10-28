import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'w7zg262g',
    dataset: 'production',
    apiVersion: '2022-10-26',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    // withCredentials: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);