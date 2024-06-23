import { HighlightedText } from "~/libs/shared-ui/HighlightedText";
import { updates } from "./tutarium/updates";
import { Lore, type MappedLore, type MappedUpdate } from "./tutarium/types";
import { intlFormat } from "date-fns";
import { Link, useLoaderData } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";

const lore = import.meta.glob("./tutarium.lore.*.mdx");

export const meta: MetaFunction = () => {
  return [
    { title: "Tutarium | Colum Ferry" },
    {
      name: "description",
      content:
        "A fantasy world where my next series of books are set. A world unlike our own. Home to Humans, Elves, Dwarves and more. A mystical aura, The Essence, permeates the land",
    },
    { property: "og:title", content: "Tutarium | Colum Ferry" },
    {
      property: "og:description",
      content:
        "A fantasy world where my next series of books are set. A world unlike our own. Home to Humans, Elves, Dwarves and more. A mystical aura, The Essence, permeates the land",
    },
  ];
};

const TagColors: Record<string, string> = {
  tutarium: "bg-amber-300 text-black",
  "the rise of demons": "bg-blue-800 text-white",
  "word count": "bg-violet-400 text-black",
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
    });
  }

  return {
    updates: updates
      .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime())
      .map((u) => ({
        ...u,
        postedDate: intlFormat(u.postedDate, {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }),
      }))
      .slice(0, 5) as MappedUpdate[],
    loreListings: loreListings.sort(
      (a, b) =>
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
    ),
  };
};

export default function Tutarium() {
  const { updates, loreListings } = useLoaderData<typeof loader>();
  return (
    <div className="mt-4 pb-10">
      <h1 className="text-left text-3xl py-4 mt-4 font-bold animate__animated animate__fadeInUp animate__fast underline decoration-emerald-300 decoration-4">
        Tutarium
      </h1>
      <h2 className="text-slate-700 text-xl py-4 font-semibold animate__animated animate__fadeInUp animate__delay-1s">
        A world unlike our own. Home to Humans, Elves, Dwarves and more. A
        mystical aura, <HighlightedText>The Essence</HighlightedText>, permeates
        the land. Control of The Essence is reserved but for mages showing high
        affinity to its presence throughout the land.
      </h2>
      <h3 className="text-slate-700 text-lg py-4 font-semibold animate__animated animate__fadeInUp animate__delay-1s">
        I intend to bring many of the stories that have occurred within this
        world to you, starting with one of the turning points in history and
        knowledge for the citizens of Tutarium,{" "}
        <HighlightedText>The Dark War</HighlightedText>.
      </h3>
      <p className="text-slate-700 animate__animated animate__fadeInUp animate__delay-2s">
        On this page, you'll find a collection of updates, lore and short
        stories pertaining to <HighlightedText>Tutarium</HighlightedText>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="animate__animated animate__fadeInUp animate__delay-2s">
          <h1 className="text-left text-2xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
            Recent Updates
          </h1>
          <RecentUpdates updates={updates} />
        </div>
        <div className="animate__animated animate__fadeInUp animate__delay-2s">
          <div className="flex justify-between items-baseline">
            <h1 className="text-left text-2xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
              <Link to={"/tutarium/lore"}>Lore</Link>
            </h1>
            <Link
              to={`/tutarium/lore`}
              className="underline font-medium decoration-emerald-500 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300"
            >
              View all
            </Link>
          </div>
          <RecentLore loreListings={loreListings} />
        </div>
      </div>
    </div>
  );
}

const RecentUpdates = ({ updates }: { updates: MappedUpdate[] }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {updates &&
        updates.map((update) => (
          <UpdateCard
            key={`${update.title}-${update.postedDate}`}
            update={update}
          />
        ))}
    </div>
  );
};

const RecentLore = ({ loreListings }: { loreListings: MappedLore[] }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {loreListings &&
        loreListings.map((loreListing) => (
          <LoreCard
            key={`${loreListing.title}-${loreListing.postedDate}`}
            {...loreListing}
          />
        ))}
    </div>
  );
};

const UpdateCard = ({ update }: { update: MappedUpdate }) => {
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
        {update.tags &&
          update.tags.map((tag) => (
            <Tag key={`${update.title}-${tag}`} tag={tag} />
          ))}
      </div>
    </div>
  );
};

const LoreCard = ({
  slug,
  title,
  description,
  image,
  postedDate,
  tags,
}: MappedLore) => {
  return (
    <Link
      className="block rounded-xl bg-white shadow border border-zinc-100 hover:shadow-lg hover:border hover:border-emerald-300 sm:hover:scale-110 text-slate-700 transition"
      to={`/tutarium/lore/${slug}`}
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
          {tags && tags.map((tag) => <Tag key={`${title}-${tag}`} tag={tag} />)}
        </div>
      </div>
    </Link>
  );
};

const Tag = ({ tag }: { tag: string }) => {
  return (
    <span
      className={`${TagColors[tag.toLowerCase()] ?? "bg-emerald-300"} rounded-xl px-2 py-[1px] text-xs`}
    >
      {tag}
    </span>
  );
};
