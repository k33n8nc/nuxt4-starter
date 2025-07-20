// This defines a simple array of our feature data.
// You could also import this from a separate .json or .ts file.
const featureData = [
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

// This creates the API route handler.
// Nuxt will automatically return the data as JSON.
export default defineEventHandler((event) => {
    return featureData;
});