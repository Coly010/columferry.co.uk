import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import { notFound } from "next/navigation";
import { intlFormat } from "date-fns";
import { HighlightedText } from "@/components/highlighted-text";
import { InTextLink } from "@/components/in-text-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MarkdownContent } from "@/components/markdown-content";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Colum Ferry`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const publishedDate = post.publishedDate
    ? intlFormat(new Date(post.publishedDate), {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
    : undefined;

  return (
    <div className="mt-4">
      <Breadcrumbs />
      {post.image && (
        <img src={post.image} alt={post.title} className="rounded-xl" />
      )}
      <h1 className="pl-0.5 sm:pl-10 text-slate-700 text-3xl font-bold my-4">
        {post.title}
      </h1>
      <div className="pl-0.5 sm:pl-10 italic">
        {publishedDate && (
          <h4 className="text-xs font-light pb-2">
            {post.canonical ? "Originally posted" : "Posted"} on{" "}
            <HighlightedText>{publishedDate}</HighlightedText>
            {post.canonical && (
              <span>
                {" "}
                at{" "}
                <InTextLink
                  baseTextSize="text-xs"
                  keepTextSize
                  target="_blank"
                  href={post.canonical}
                >
                  {new URL(post.canonical).hostname}
                </InTextLink>
              </span>
            )}
          </h4>
        )}
      </div>
      <div className="px-0.5 sm:px-10 pt-4 pb-20 prose">
        <MarkdownContent content={post.content} />
      </div>
    </div>
  );
}
