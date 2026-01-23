import Link from "next/link";
import { getAllLoreArticles } from "@/lib/content";
import { intlFormat } from "date-fns";
import { HighlightedText } from "@/components/highlighted-text";
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

interface Update {
  title: string;
  content: string;
  postedDate: string;
  tags: string[];
}

const TagColors: Record<string, string> = {
  tutarium: "bg-amber-300 text-black",
  "the rise of demons": "bg-blue-800 text-white",
  "word count": "bg-violet-400 text-black",
};

const updates: Update[] = [
  {
    title: "Word Count Update",
    postedDate: intlFormat(new Date("June 4, 2024"), {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
    content: `I'm about halfway through what is currently Chapter Fourteen and the word count update at this point is: <span class="font-semibold">38,395 words</span>!`,
    tags: ["Word Count", "Tutarium", "The Rise of Demons"],
  },
  {
    title: "Word Count Update",
    postedDate: intlFormat(new Date("June 15, 2024"), {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
    content: `Most recent word count update at this point is: <span class="font-semibold">41,090 words</span>!`,
    tags: ["Word Count", "Tutarium", "The Rise of Demons"],
  },
  {
    title: "So, I've made a decision...",
    postedDate: intlFormat(new Date("June 23, 2024"), {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
    content: `It's nothing too major. I've decided that The Rise of Demons should go from one character's perspective, to three.
This means that the book will take longer to finish, however, it will be a much better book for it!
Most recent word count update at this point is: <span class="font-semibold">43,946 words</span>!`,
    tags: ["Word Count", "Tutarium", "The Rise of Demons"],
  },
  {
    title: "Vivrel's storyline completed!",
    postedDate: intlFormat(new Date("August 30, 2024"), {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
    content: `Vivrel's storyline has been completed! His final chapter also reflects the final chapter in the book, so it was nice to see the ending completed.
That just leaves Calilas' storyline and Marvello's. I need to properly plan these out and find where each of the chapters that will make up their stories should fit.
Most recent word count update at this point is: <span class="font-semibold">62,202 words</span>!`,
    tags: ["Word Count", "Tutarium", "The Rise of Demons"],
  },
].sort(
  (a, b) =>
    new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
);

export default function Tutarium() {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h1 className="text-left text-2xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
            Recent Updates
          </h1>
          <div className="grid grid-cols-1 gap-2">
            {updates.slice(0, 5).map((update, i) => (
              <UpdateCard key={`${update.title}-${i}`} update={update} />
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

function UpdateCard({ update }: { update: Update }) {
  return (
    <div className="my-2 p-2 rounded-xl bg-white shadow border border-zinc-100">
      <h4 className="text-xs font-light italic my-2">
        Posted on {update.postedDate}
      </h4>
      <h3 className="text-lg font-semibold my-2">{update.title}</h3>
      <p
        className="text-sm font-light whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: update.content }}
      ></p>
      <div className="flex gap-1 mt-4">
        {update.tags.map((tag) => (
          <Tag key={`${update.title}-${tag}`} tag={tag} />
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
