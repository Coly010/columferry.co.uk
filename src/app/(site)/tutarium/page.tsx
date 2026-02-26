import Link from "next/link";
import { getAllLoreArticles, getAllUpdates } from "@/lib/content";
import { intlFormat } from "date-fns";
import { HighlightedText } from "@/components/highlighted-text";
import { MarkdownContent } from "@/components/markdown-content";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutarium | Colum Ferry",
  description:
    "A fantasy world where my next series of books are set. A world unlike our own. Home to Humans, Elves, Dwarves and more. A mystical aura, The Essence, permeates the land",
  openGraph: {
    title: "Tutarium | Colum Ferry",
    description:
      "A fantasy world where my next series of books are set. A world unlike our own. Home to Humans, Elves, Dwarves and more. A mystical aura, The Essence, permeates the land",
  },
};

const TagColors: Record<string, string> = {
  tutarium: "bg-amber-300 text-black",
  "the rise of demons": "bg-blue-800 text-white",
  "word count": "bg-violet-400 text-black",
};

export default function Tutarium() {
  const updates = getAllUpdates()
    .sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
    )
    .map((update) => ({
      ...update,
      formattedDate: intlFormat(new Date(update.postedDate), {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }),
    }));

  const loreArticles = getAllLoreArticles().map((article) => ({
    ...article,
    postedDate: article.postedDate
      ? intlFormat(new Date(article.postedDate), {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : undefined,
  }));

  return (
    <div className="mt-4 pb-10">
      <h1 className="text-left text-3xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
        Tutarium
      </h1>
      <h2 className="text-slate-700 text-xl py-4 font-semibold">
        A world unlike our own. Home to Humans, Elves, Dwarves and more. A
        mystical aura, <HighlightedText>The Essence</HighlightedText>, permeates
        the land. Control of The Essence is reserved but for mages showing high
        affinity to its presence throughout the land.
      </h2>
      <h3 className="text-slate-700 text-lg py-4 font-semibold">
        I intend to bring many of the stories that have occurred within this
        world to you, starting with one of the turning points in history and
        knowledge for the citizens of Tutarium,{" "}
        <HighlightedText>The Dark War</HighlightedText>.
      </h3>
      <p className="text-slate-700">
        On this page, you&apos;ll find a collection of updates, lore and short
        stories pertaining to <HighlightedText>Tutarium</HighlightedText>.
      </p>
      <div className="mt-6">
        <NewsletterSubscribe />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h1 className="text-left text-2xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
            Recent Updates
          </h1>
          <div className="grid grid-cols-1 gap-2">
            {updates.slice(0, 5).map((update, i) => (
              <UpdateCard key={`${update.slug}-${i}`} update={update} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-baseline">
            <h1 className="text-left text-2xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
              <Link href="/tutarium/lore">Lore</Link>
            </h1>
            <Link
              href="/tutarium/lore"
              className="underline font-medium decoration-emerald-500 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {loreArticles.map((article) => (
              <LoreCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdateCard({
  update,
}: {
  update: {
    slug: string;
    title: string;
    formattedDate: string;
    content: string;
    tags: string[];
  };
}) {
  return (
    <div className="my-2 p-2 rounded-xl bg-white shadow border border-zinc-100">
      <h4 className="text-xs font-light italic my-2">
        Posted on {update.formattedDate}
      </h4>
      <h3 className="text-lg font-semibold my-2">{update.title}</h3>
      <div className="text-sm font-light whitespace-pre-wrap prose prose-sm">
        <MarkdownContent content={update.content} />
      </div>
      <div className="flex gap-1 mt-4">
        {update.tags.map((tag) => (
          <Tag key={`${update.slug}-${tag}`} tag={tag} />
        ))}
      </div>
    </div>
  );
}

function LoreCard({
  slug,
  title,
  description,
  image,
  postedDate,
  tags,
}: {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  postedDate?: string;
  tags?: string[];
}) {
  return (
    <Link
      className="block rounded-xl bg-white shadow border border-zinc-100 hover:shadow-lg hover:border hover:border-emerald-300 sm:hover:scale-110 text-slate-700 transition"
      href={`/tutarium/lore/${slug}`}
    >
      {image && (
        <img className="rounded-t-xl object-fill" src={image} alt={title} />
      )}
      <div className="py-4 px-2">
        {postedDate && (
          <h4 className="text-xs font-light pb-2">
            Posted on <HighlightedText>{postedDate}</HighlightedText>
          </h4>
        )}
        <h2 className="font-semibold text-xl">{title}</h2>
        <h4 className="font-light text-sm">{description}</h4>
        <div className="flex gap-1 mt-4">
          {tags?.map((tag) => <Tag key={`${title}-${tag}`} tag={tag} />)}
        </div>
      </div>
    </Link>
  );
}

function Tag({ tag }: { tag: string }) {
  return (
    <span
      className={`${TagColors[tag.toLowerCase()] ?? "bg-emerald-300"} rounded-xl px-2 py-[1px] text-xs`}
    >
      {tag}
    </span>
  );
}
