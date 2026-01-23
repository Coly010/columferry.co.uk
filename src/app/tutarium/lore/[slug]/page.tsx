import { getAllLoreArticles, getLoreArticle } from "@/lib/content";
import { notFound } from "next/navigation";
import { intlFormat } from "date-fns";
import { HighlightedText } from "@/components/highlighted-text";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MarkdownContent } from "@/components/markdown-content";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  const articles = getAllLoreArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getLoreArticle(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} | Lore | Tutarium | Colum Ferry`,
    description: article.description,
    openGraph: {
      title: `${article.title} | Lore | Tutarium | Colum Ferry`,
      description: article.description,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default function LoreDetail({ params }: Props) {
  const article = getLoreArticle(params.slug);
  if (!article) notFound();

  const postedDate = article.postedDate
    ? intlFormat(new Date(article.postedDate), {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : undefined;

  return (
    <div className="mt-4">
      <Breadcrumbs />
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="rounded-xl max-h-[420px] mx-auto"
        />
      )}
      <h1 className="pl-0.5 sm:pl-10 text-slate-700 text-3xl font-bold my-4">
        {article.title}
      </h1>
      <div className="pl-0.5 sm:pl-10 italic">
        {postedDate && (
          <h4 className="text-xs font-light pb-2">
            Posted on <HighlightedText>{postedDate}</HighlightedText>
          </h4>
        )}
      </div>
      <div className="px-0.5 sm:px-10 pt-4 pb-20 prose">
        <MarkdownContent content={article.content} />
      </div>
    </div>
  );
}
