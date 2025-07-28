// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

import starlight from "@astrojs/starlight";
import { sidebar } from "./src/config/sidebar.ts";

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
    starlight({
      title: "Programación con IA",
      defaultLocale: "root",
      locales: {
        root: {
          label: "Español",
          lang: "es",
        },
        en: {
          label: "English",
          lang: "en",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      customCss: ["./src/styles/custom.css"],
      sidebar: sidebar,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
