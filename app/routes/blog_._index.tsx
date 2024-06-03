import { MetaFunction, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { intlFormat } from "date-fns";
import { ImportedPost } from "~/routes/blog/types";
import { HighlightedText } from "~/libs/shared-ui/HighlightedText";
import { InTextLink } from "~/libs/shared-ui/InTextLink";

type BlogListing = {
  slug: string;
  title: string;
  image?: string;
  canonical?: string;
  publishedDate?: string;
  tags?: string[];
};
type BlogListings = Array<BlogListing>;

const posts = import.meta.glob("./*.mdx");
const BlogTagColors: Record<string, string> = {
  javascript: "bg-amber-300 text-black",
  typescript: "bg-blue-800 text-white",
  webdev: "bg-sky-300 text-black",
  nx: "bg-cyan-400 text-black",
  qwik: "bg-violet-400 text-black",
};

export const meta: MetaFunction = () => {
  return [
    { title: "Blog | Colum Ferry" },
    {
      name: "description",
      content:
        "Take a look through my blog posts on everything from Tech to Writing. Find articles about Angular, Nx, Module Federation and more here.",
    },
  ];
};

export const loader: LoaderFunction = async (): Promise<BlogListings> => {
  const mappedPosts: BlogListings = [];
  const postImports = Object.entries(posts);
  for (const [filename, importPost] of postImports) {
    const post: ImportedPost = (await importPost()) as ImportedPost;
    mappedPosts.push({
      slug: filename.replace("blog.", "").replace(/\.mdx?$/, ""),
      title: post.title,
      publishedDate: intlFormat(post.publishedDate ?? new Date(), {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
      image: post.image,
      tags: post.tags,
      canonical: post.canonical,
    });
  }
  return mappedPosts;
};

export default function Blog__index() {
  const data: BlogListings = useLoaderData<typeof loader>();
  return (
    <div className="mt-4">
      <h1 className="text-left text-3xl py-4 mt-4 font-bold animate__animated animate__fadeInUp animate__fast underline decoration-emerald-300 decoration-4">
        Welcome to my blog
      </h1>
      <h2 className="text-xl text-slate-700 py-4 font-semibold animate__animated animate__fadeInUp animate__delay-1s">
        Here you will find a collection of articles I have written throughout my
        career, from tech articles to things I've learned since I began
        publishing fictional works.
      </h2>
      <div className="mt-4 grid animate__animated animate__fadeInUp animate__delay-2s">
        {data.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}

const BlogCard = ({
  slug,
  title,
  image,
  publishedDate,
  canonical,
  tags,
}: BlogListing) => {
  return (
    <Link
      className="block rounded-t-xl max-w-[320px] bg-white shadow border border-zinc-100 hover:shadow-lg hover:border hover:border-emerald-300 hover:scale-110 text-slate-700 transition"
      to={`/blog/${slug}`}
    >
      {image && <img className="rounded-t-xl" src={image} alt={title} />}
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
          {tags &&
            tags.map((tag) => <BlogTag key={`${title}-${tag}`} tag={tag} />)}
        </div>
      </div>
    </Link>
  );
};

const BlogTag = ({ tag }: { tag: string }) => {
  return (
    <span
      className={`${BlogTagColors[tag] ?? "bg-emerald-300"} rounded-xl px-2 py-[1px] text-xs`}
    >
      {tag}
    </span>
  );
};
