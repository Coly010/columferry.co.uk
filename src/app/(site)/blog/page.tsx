import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import { intlFormat } from "date-fns";
import { HighlightedText } from "@/components/highlighted-text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Colum Ferry",
  description:
    "Take a look through my blog posts on everything from Tech to Writing. Find articles about Angular, Nx, Module Federation and more here.",
  openGraph: {
    title: "Blog | Colum Ferry",
    description:
      "Take a look through my blog posts on everything from Tech to Writing. Find articles about Angular, Nx, Module Federation and more here.",
  },
};

const BlogTagColors: Record<string, string> = {
  javascript: "bg-amber-300 text-black",
  typescript: "bg-blue-800 text-white",
  webdev: "bg-sky-300 text-black",
  nx: "bg-cyan-400 text-black",
  qwik: "bg-violet-400 text-black",
};

export default function BlogIndex() {
  const posts = getAllBlogPosts();

  const sortedPosts = posts
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      publishedDate: post.publishedDate
        ? intlFormat(new Date(post.publishedDate), {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })
        : undefined,
      image: post.image,
      tags: post.tags,
      canonical: post.canonical,
    }))
    .sort((a, b) =>
      a.publishedDate && b.publishedDate
        ? new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
        : 1,
    );

  return (
    <div className="mt-4 pb-20">
      <h1 className="text-left text-3xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
        Welcome to my blog
      </h1>
      <h2 className="text-xl text-slate-700 py-4 font-semibold">
        Here you will find a collection of articles I have written throughout my
        career, from tech articles to things I&apos;ve learned since I began
        publishing fictional works.
      </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {sortedPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}

function BlogCard({
  slug,
  title,
  image,
  publishedDate,
  canonical,
  tags,
}: {
  slug: string;
  title: string;
  image?: string;
  publishedDate?: string;
  canonical?: string;
  tags?: string[];
}) {
  return (
    <Link
      className="block rounded-t-xl bg-white shadow border border-zinc-100 hover:shadow-lg hover:border hover:border-emerald-300 sm:hover:scale-110 text-slate-700 transition"
      href={`/blog/${slug}`}
    >
      {image && (
        <img className="rounded-t-xl object-cover" src={image} alt={title} />
      )}
      <div className="py-4 px-2">
        {publishedDate && (
          <h4 className="text-xs font-light pb-2">
            {canonical ? "Originally posted" : "Posted"} on{" "}
            <HighlightedText>{publishedDate}</HighlightedText>
            {canonical && (
              <span>
                {" "}
                at{" "}
                <HighlightedText>{new URL(canonical).hostname}</HighlightedText>
              </span>
            )}
          </h4>
        )}
        <h2 className="font-semibold text-xl">{title}</h2>
        <div className="flex gap-1 mt-4">
          {tags?.map((tag) => <BlogTag key={`${title}-${tag}`} tag={tag} />)}
        </div>
      </div>
    </Link>
  );
}

function BlogTag({ tag }: { tag: string }) {
  return (
    <span
      className={`${BlogTagColors[tag] ?? "bg-emerald-300"} rounded-xl px-2 py-[1px] text-xs`}
    >
      {tag}
    </span>
  );
}
