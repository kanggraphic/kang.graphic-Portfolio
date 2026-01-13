import { sanityFetch, queries } from "@/lib/sanity";

import ArticleDetailClient from "@/components/ArticleDetailClient";
import { notFound } from "next/navigation";

// Generate static params from Sanity
export async function generateStaticParams() {
  try {
    const articles = await sanityFetch<any[]>(queries.allArticles);

    if (!articles || articles.length === 0) {
      return []; // Return empty array if no articles
    }

    return articles.map((article) => ({
      slug: article.slug.current,
    }));
  } catch (error) {
    console.log('Failed to generate static params:', error);
    return []; // Return empty array on error
  }
}

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const article = await sanityFetch<any>(queries.articleBySlug(slug));

    // If article not found, show 404
    if (!article) {
      notFound();
    }

    return (
      <ArticleDetailClient article={article} slug={slug} />
    );
  } catch (error) {
    console.log('Failed to fetch article:', error);
    notFound();
  }
}
