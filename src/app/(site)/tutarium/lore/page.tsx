import Link from "next/link";
import { getAllLoreArticles } from "@/lib/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lore | Tutarium | Colum Ferry",
  description: "A collection of content based around the world of Tutarium.",
  openGraph: {
    title: "Lore | Tutarium | Colum Ferry",
    description: "A collection of content based around the world of Tutarium.",
  },
};

type LoreType = "location" | "character" | "natural-wonder";
const LoreTypeToText: Record<LoreType, string> = {
  location: "Locations",
  character: "Characters",
  "natural-wonder": "Natural Wonders",
};

export default function LorePage() {
  const loreArticles = getAllLoreArticles();

  const categorisedLore: Record<LoreType, typeof loreArticles> = {} as Record<
    LoreType,
    typeof loreArticles
  >;
  for (const article of loreArticles) {
    if (!article.loreType) continue;
    categorisedLore[article.loreType] ??= [];
    categorisedLore[article.loreType].push(article);
  }

  return (
    <div className="my-4 pb-10">
      <Breadcrumbs />
      <h1 className="text-left text-3xl py-4 mb-4 font-bold underline decoration-emerald-300 decoration-4">
        Tutarium Lore
      </h1>
      <h2 className="text-left text-xl py-4 mb-4 font-medium">
        I have a ton of notes on everything that I know about Tutarium that I
        use when writing for the series. There&apos;s so much additional
        information here that it feels almost selfish to keep it to myself. So
        enjoy!
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {(Object.entries(categorisedLore) as [LoreType, typeof loreArticles][]).map(
          ([loreType, articles]) => (
            <div key={loreType}>
              <h3 className="font-semibold text-lg mb-2">
                {LoreTypeToText[loreType]}
              </h3>
              <ul className="list-inside">
                {articles.map((article) => (
                  <li key={article.slug} className="list-none pl-2">
                    <Link
                      href={`/tutarium/lore/${article.slug}`}
                      className="text-emerald-600 transition hover:text-emerald-300"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
      <div className="mt-8">
        <NewsletterSubscribe compact />
      </div>
    </div>
  );
}
