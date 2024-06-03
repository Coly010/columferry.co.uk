import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ImportedPost } from "~/routes/blog/types";
import { HighlightedText } from "~/libs/shared-ui/HighlightedText";
import { InTextLink } from "~/libs/shared-ui/InTextLink";
import { intlFormat } from "date-fns";

const posts = import.meta.glob("./*.mdx");

export async function loader({ request }: LoaderFunctionArgs) {
  const blogPostPath =
    "./" +
    request.url
      .slice(request.url.search(/blog\/.*/))
      .replace("blog/", "blog.") +
    ".mdx";

  const importPost = posts[blogPostPath];
  const importedPost = (await importPost()) as ImportedPost;
  return {
    title: importedPost.title,
    image: importedPost.image,
    tags: importedPost.tags,
    canonical: importedPost.canonical,
    publishedDate: intlFormat(importedPost.publishedDate ?? new Date(), {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
  };
}

export default function Component() {
  const post = useLoaderData<typeof loader>();
  return (
    <div className="mt-4">
      <img
        src={post.image}
        alt={post.title}
        className="rounded-xl animate__animated animate__fadeInUp animate__fast"
      />
      <h1 className="pl-0.5 sm:pl-10 text-slate-700 text-3xl font-bold my-4 animate__animated animate__fadeInUp animate__fast animate__delay-1s">
        {post.title}
      </h1>
      <div className="pl-0.5 sm:pl-10 italic animate__animated animate__fadeInUp animate__delay-2s animate__faster">
        {post.publishedDate && (
          <h4 className="text-xs font-light pb-2">
            {post.canonical ? "Originally posted" : "Posted"} on{" "}
            <HighlightedText>{post.publishedDate}</HighlightedText>
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
      <div className="px-0.5 sm:px-10 pt-4 pb-20 prose animate__animated animate__fadeInUp animate__delay-2s animate__faster">
        <Outlet />
      </div>
    </div>
  );
}
