import { HighlightedText } from "~/libs/shared-ui/HighlightedText";
import { updates } from "./tutarium/updates";
import { type MappedUpdate } from "./tutarium/types";
import { intlFormat } from "date-fns";
import { useLoaderData } from "@remix-run/react";

const BlogTagColors: Record<string, string> = {
  tutarium: "bg-amber-300 text-black",
  "the rise of demons": "bg-blue-800 text-white",
  "word count": "bg-violet-400 text-black",
};

export const loader = () => {
  return {
    updates: updates
      .map((u) => ({
        ...u,
        postedDate: intlFormat(u.postedDate, {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }),
      }))
      .sort((a, b) => b.postedDate.getTime() - a.postedDate.getTime())
      .slice(0, 5) as MappedUpdate[],
  };
};

export default function Tutarium() {
  const { updates } = useLoaderData<typeof loader>();
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
          <h1 className="text-left text-2xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
            Lore
          </h1>
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

const Tag = ({ tag }: { tag: string }) => {
  return (
    <span
      className={`${BlogTagColors[tag.toLowerCase()] ?? "bg-emerald-300"} rounded-xl px-2 py-[1px] text-xs`}
    >
      {tag}
    </span>
  );
};
