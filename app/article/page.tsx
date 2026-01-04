import { sanityFetch, queries, Article } from "@/lib/sanity";
import ArticleListClient from "./ArticleListClient";

export default async function ArticlePage() {
  let articles: Article[] = [];

  try {
    const sanityArticles = await sanityFetch<Article[]>(queries.allArticles);
    if (sanityArticles && sanityArticles.length > 0) {
      articles = sanityArticles;
    }
  } catch (error) {
    console.log('Failed to fetch articles from Sanity:', error);
  }

  return <ArticleListClient articles={articles} />;
}
