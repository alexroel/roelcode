// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://roelcode.com",
  integrations: [
    icon(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        "https://roelcode.com/",
        "https://roelcode.com/cursos",
        "https://roelcode.com/acerca-de",
      ],
      serialize(item) {
        // Personalizar prioridades por página
        if (item.url === "https://roelcode.com/") {
          item.priority = 1.0;
          item.changefreq = "daily";
        } else if (item.url === "https://roelcode.com/cursos") {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (item.url === "https://roelcode.com/acerca-de") {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
