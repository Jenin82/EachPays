import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
            },
            includeAssets: [
                "favicon.ico",
                "public/apple-touch-icon.png",
                "mask-icon.svg",
            ],
            manifest: {
                name: "EachPays",
                short_name: "EachPays",
                description: "An app track your group expenses",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "public/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "public/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "public/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "public/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
});