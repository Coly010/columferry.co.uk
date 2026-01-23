import { intlFormat } from "date-fns";
import { HighlightedText } from "@/components/highlighted-text";
import { InTextLink } from "@/components/in-text-link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books | Colum Ferry",
  description:
    "Find all my written work and works in progress here. Look out for The Blackstone Legacy and Tutarium!",
  openGraph: {
    title: "Books | Colum Ferry",
    description:
      "Find all my written work and works in progress here. Look out for The Blackstone Legacy and Tutarium!",
  },
};

interface BookListing {
  title: string;
  publishedDate: Date;
  blurb: string;
  amazonLink: string;
  image: string;
  wip?: boolean;
}

interface MappedBookListing {
  title: string;
  publishedDate?: string;
  blurb: string;
  amazonLink: string;
  image: string;
  wip?: boolean;
}

const books: BookListing[] = [
  {
    title: "The Blackstone Legacy",
    blurb: `In the city of Arcanum, where magic is a way of life, the Mage Guild is the guardian of peace and order. But when the Goblins, a race of powerful and dangerous magic users, present a threat to the citizens of Arcanum, the Guild Defense Unit, an elite group of mages, is called to action. Led by the formidable High Elder Arcanos, the Defence Unit launches a surprise attack on the Goblins, hoping to crush them once and for all. But the Goblins are not so easily defeated, and the battle quickly becomes a fierce and deadly struggle. As the two sides clash, the fate of Arcanum hangs in the balance.

But is everything as it seems?

Lucas Greystone, a mage-in-training, is summoned to go on his Graduation Challenge to investigate a dragon attack in the nearby village of Willowdale. He soon realises he's stumbling into a mystery much more extreme as he discovers dark secrets about the Guild itself.`,
    publishedDate: new Date("January 2, 2023"),
    amazonLink:
      "https://www.amazon.co.uk/Blackstone-Legacy-Colum-Ferry/dp/B0BRDCPVXK/",
    image: "/books/the-blackstone-legacy.jpg",
  },
  {
    title: "Tutarium: The Rise of Demons",
    publishedDate: new Date(),
    blurb: `Strange events continue to arise in Osgrua. Sightings of balls of black flame containing what can only be described as a monster clawing to escape. Such events are so ludicrous they've been ignored and the reporters' sanity questioned.

Never before has Osgrua encountered such happenings.

Vivrel Ginlo, an elf holding the position of The Protector of the Realm on the Grand Elven Council stands alone in his belief that these events are linked to his theories that demons exist in this world and that they've been trying to break through into the living realm for centuries.

With no mention of demons existing in recorded history, he faces constant criticism from his fellow Council members.

Steadfast in his belief, he chases down the latest series of reports and discovers so much more than he could have bargained for.`,
    amazonLink: "",
    image: "",
    wip: true,
  },
];

export default function Books() {
  const sortedBooks = books
    .sort((a, b) =>
      a.publishedDate && b.publishedDate
        ? b.publishedDate.getTime() - a.publishedDate.getTime()
        : 1,
    )
    .map((b) => ({
      ...b,
      publishedDate: b.publishedDate
        ? intlFormat(b.publishedDate, {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })
        : undefined,
    })) as MappedBookListing[];

  const publishedBooks = sortedBooks.filter((b) => !b.wip);
  const wipBooks = sortedBooks.filter((b) => b.wip);

  return (
    <>
      <div className="mt-4 pb-10">
        <h1 className="text-left text-3xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
          My published books
        </h1>
        <h2 className="text-xl text-slate-700 py-4 font-semibold">
          Here you will find a collection of the books I have written or that I
          am currently in the process of writing.
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-2">
          {publishedBooks.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
      <div className="mt-4 pb-20">
        <h1 className="text-left text-3xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
          Works in Progress
        </h1>
        <h2 className="text-xl text-slate-700 py-4 font-semibold">
          I&apos;m always working on a book or two, or three, in my spare time.
          There is one series in particular,{" "}
          <HighlightedText>The Dark War Trilogy</HighlightedText>, set in the{" "}
          <HighlightedText>Tutarium</HighlightedText> universe that has
          captivated my interest for the better part of six years.
        </h2>
        <p className="text-md text-slate-700 py-4">
          <HighlightedText>Tutarium: The Rise of Demons</HighlightedText> marks
          the first in The Dark War Trilogy. I continue to share updates on this
          over on{" "}
          <InTextLink
            baseTextSize="text-md"
            href="https://twitter.com/FerryColum"
            target="_blank"
          >
            Twitter/X
          </InTextLink>
          .
        </p>
        <p className="text-md text-slate-700 py-4">
          However, I want a more centralised location where you can view updates
          about the progress of this book as well as some short pieces of lore
          and stories set in Tutarium. For that, you can head to the{" "}
          <InTextLink baseTextSize="text-md" href="/tutarium">
            Tutarium
          </InTextLink>{" "}
          section of this site!
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2">
          {wipBooks.map((book) => (
            <BookCard key={book.title} book={book} wip />
          ))}
        </div>
      </div>
    </>
  );
}

function BookCard({
  book,
  wip = false,
}: {
  book: MappedBookListing;
  wip?: boolean;
}) {
  return (
    <div className="block rounded-xl bg-white shadow border border-zinc-100 hover:shadow-lg hover:border hover:border-emerald-300 text-slate-700 transition">
      <div className="grid grid-cols-5 gap-4">
        <div
          className={`hidden sm:block sm:col-span-2 ${wip ? "grid grid-cols-1 place-items-center place-content-center bg-emerald-100 rounded-l-xl" : ""}`}
        >
          {!wip ? (
            <img
              src={book.image}
              alt={book.title}
              className="object-cover rounded-l-xl h-full"
            />
          ) : (
            <div className="bg-emerald-600 text-white text-xl text-center whitespace-pre-wrap font-serif flex-grow">
              <h2>{book.title}</h2>
            </div>
          )}
        </div>
        <div className="col-span-5 sm:col-span-3 text-slate-700 py-4 px-2">
          <h2 className="font-semibold text-2xl">{book.title}</h2>
          {!wip && (
            <span className="text-xs font-light pb-2">
              Published on{" "}
              <HighlightedText>{book.publishedDate}</HighlightedText>
            </span>
          )}
          {!wip && (
            <img
              src={book.image}
              alt={book.title}
              width={126}
              className="block mx-auto rounded-xl mt-6 sm:hidden"
            />
          )}
          <p className="pt-4 text-sm whitespace-pre-wrap">{book.blurb}</p>
          {!wip && (
            <a
              href={book.amazonLink}
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center gap-2 p-2 mt-4 border border-amber-300 min-w-[48px] h-10 rounded-xl transition transform shadow active:scale-95 bg-amber-500 text-black hover:bg-amber-300 select-none"
            >
              <span>Buy on Amazon</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
