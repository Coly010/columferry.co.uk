import { MetaFunction } from "@remix-run/node";
import {
  Lore,
  LoreType,
  LoreTypeToText,
  MappedLore,
} from "~/routes/tutarium/types";
import { intlFormat } from "date-fns";
import { Link, useLoaderData } from "@remix-run/react";
import { Breadcrumbs } from "~/components/breadcrumbs";

const lore = import.meta.glob("./tutarium.lore.*.mdx");

export const meta: MetaFunction = () => {
  return [
    { title: "Lore | Tutarium | Colum Ferry" },
    {
      name: "description",
      content: "A collection of content based around the world of Tutarium.",
    },
    { property: "og:title", content: "Lore | Tutarium | Colum Ferry" },
    {
      property: "og:description",
      content: "A collection of content based around the world of Tutarium.",
    },
  ];
};

export const loader = async () => {
  const loreListings: MappedLore[] = [];

  const loreImports = Object.entries(lore);
  for (const [filename, importLore] of loreImports) {
    const loreListing: Lore = (await importLore()) as Lore;
    loreListings.push({
      slug: filename.replace("tutarium.lore.", "").replace(/\.mdx?$/, ""),
      title: loreListing.title,
      postedDate: intlFormat(loreListing.postedDate ?? new Date(), {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
      description: loreListing.description,
      tags: loreListing.tags,
      image: loreListing.image,
      loreType: loreListing.loreType,
    });
  }

  const categorisedLore: Record<LoreType, MappedLore[]> = {} as any;
  for (const l of loreListings) {
    if (!l.loreType) {
      continue;
    }

    categorisedLore[l.loreType] ??= [];
    categorisedLore[l.loreType].push(l);
  }

  return {
    categorisedLore,
  };
};

export default function LorePage() {
  const { categorisedLore } = useLoaderData<typeof loader>();
  return (
    <div className="my-4 pb-10">
      <Breadcrumbs />
      <h1 className="text-left text-3xl py-4 mb-4 font-bold animate__animated animate__fadeInUp animate__fast underline decoration-emerald-300 decoration-4">
        Tutarium Lore
      </h1>
      <h2 className="text-left text-xl py-4 mb-4 font-medium animate__animated animate__fadeInUp animate__fast animate__delay-1s">
        I have a ton of notes on everything that I know about Tutarium that I
        use when writing for the series. There's so much additional information
        here that it feels almost selfish to keep it to myself. So enjoy!
      </h2>
      <div className="grid grid-cols-2 gap-4 animate__animated animate__fadeInUp animate__fast animate__delay-2s">
        {categorisedLore &&
          (Object.entries(categorisedLore) as [LoreType, MappedLore[]][]).map(
            ([loreType, loreListings]) => (
              <div key={loreType}>
                <h3 className="font-semibold text-lg mb-2">
                  {LoreTypeToText[loreType]}
                </h3>
                <ul className="list-inside">
                  {loreListings.map((l) => (
                    <li key={l.slug} className="list-none pl-2">
                      <Link
                        to={`/tutarium/lore/${l.slug}`}
                        className="text-emerald-600 transition hover:text-emerald-300"
                      >
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
      </div>
    </div>
  );
}
