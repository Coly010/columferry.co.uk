import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { HighlightedText } from "~/libs/shared-ui/HighlightedText";
import { intlFormat } from "date-fns";
import { type Lore, type MappedLore } from "~/routes/tutarium/types";

const lore = import.meta.glob("./tutarium.lore.*.mdx");

export async function loader({ request }: LoaderFunctionArgs) {
  const lorePath =
    "./" +
    request.url
      .slice(request.url.search(/tutarium\/lore\/.*/))
      .replace("tutarium/lore/", "tutarium.lore.") +
    ".mdx";

  const importedLoreFile = lore[lorePath];
  const importedLore = (await importedLoreFile()) as Lore;
  return {
    title: importedLore.title,
    image: importedLore.image,
    tags: importedLore.tags,
    postedDate: intlFormat(importedLore.postedDate ?? new Date(), {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
  } as MappedLore;
}

export default function Component() {
  const post = useLoaderData<typeof loader>();
  return (
    <div className="mt-4">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="rounded-xl animate__animated animate__fadeInUp animate__fast max-h-[420px] mx-auto"
        />
      )}
      <h1 className="pl-0.5 sm:pl-10 text-slate-700 text-3xl font-bold my-4 animate__animated animate__fadeInUp animate__fast animate__delay-1s">
        {post.title}
      </h1>
      <div className="pl-0.5 sm:pl-10 italic animate__animated animate__fadeInUp animate__delay-2s animate__faster">
        {post.postedDate && (
          <h4 className="text-xs font-light pb-2">
            Posted on <HighlightedText>{post.postedDate}</HighlightedText>
          </h4>
        )}
      </div>
      <div className="px-0.5 sm:px-10 pt-4 pb-20 prose animate__animated animate__fadeInUp animate__delay-2s animate__faster">
        <Outlet />
      </div>
    </div>
  );
}
