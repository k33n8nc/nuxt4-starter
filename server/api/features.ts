// 1. Define the shape of a single feature object.
// Using an interface is a common and clean way to do this.
interface Feature {
    id: string;
    title: string;
    description: string;
    icon: string;
}

// featureData must be an array of 'Feature' objects.
const featureData: Feature[] = [
    {
        id: 'nuxt-ready',
        title: 'Nuxt 4 Ready',
        description: 'Leveraging the latest features of the Nuxt 4 framework for top performance.',
        icon: 'logos:nuxt-icon',
    },
    {
        id: 'tailwind',
        title: 'TailwindCSS v4',
        description: 'Styled with the newest, most efficient version of TailwindCSS.',
        icon: 'logos:tailwindcss-icon',
    },
    {
        id: 'server-api',
        title: 'Built-in API',
        description: 'Data is served from a type-safe internal API route in the /server directory.',
        icon: 'uil:server-network',
    },
    {
        id: 'icon-library',
        title: 'Icon Library',
        description: 'Includes @nuxt/icon for easy access to thousands of icons.',
        icon: 'uil:icons',
    },
];

// Creates the API route handler.
// Because 'featureData' is typed, Nuxt knows the exact shape of the API response.
export default defineEventHandler((event) => {
    return featureData;
});