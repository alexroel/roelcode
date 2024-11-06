import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const posts = await getCollection('tutorials');
  
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title || 'Sin título', // Verifica que el título esté presente
      description: post.data.description || 'Sin descripción', // Verifica que la descripción esté presente
      pubDate: post.data.pubDate || new Date(), // Opcional pero recomendable
      link: `/tutorials/${post.slug}/`,
    })),
  });
}

