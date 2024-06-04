import { useLoaderData } from "@remix-run/react";
import { books, type MappedBookListing } from "./books/books";
import { intlFormat } from "date-fns";
import { HighlightedText } from "~/libs/shared-ui/HighlightedText";
import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InTextLink } from "~/libs/shared-ui/InTextLink";

export const loader = async () => {
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

  return { publishedBooks, wipBooks };
};

export default function Books() {
  const { publishedBooks, wipBooks } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="mt-4 pb-20">
        <h1 className="text-left text-3xl py-4 mt-4 font-bold animate__animated animate__fadeInUp animate__fast underline decoration-emerald-300 decoration-4">
          My published books
        </h1>
        <h2 className="text-xl text-slate-700 py-4 font-semibold animate__animated animate__fadeInUp animate__delay-1s">
          Here you will find a collection of the books I have written or that I
          am currently in the process of writing.
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-2 animate__animated animate__fadeInUp animate__delay-2s">
          {publishedBooks.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </div>
      <div className="mt-4 pb-20">
        <h1 className="text-left text-3xl py-4 mt-4 font-bold animate__animated animate__fadeInUp animate__fast animate__delay-2s underline decoration-emerald-300 decoration-4">
          Works in Progress
        </h1>
        <h2 className="text-xl text-slate-700 py-4 font-semibold animate__animated animate__fadeInUp animate__delay-2s">
          I'm always working on a book or two, or three, in my spare time. There
          is one series in particular,{" "}
          <HighlightedText>The Dark War Trilogy</HighlightedText>, set in the{" "}
          <HighlightedText>Tutarium</HighlightedText> universe that has
          captivated my interest for the better part of six years.
        </h2>
        <p className="text-md text-slate-700 py-4 animate__animated animate__fadeInUp animate__delay-2s">
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
        <p className="text-md text-slate-700 py-4 animate__animated animate__fadeInUp animate__delay-2s">
          However, I want a more centralised location where you can view updates
          about the progress of this book as well as some short pieces of lore
          and stories set in Tutarium. For that, you can head to the{" "}
          <InTextLink baseTextSize="text-md">Tutarium</InTextLink> section of
          this site!
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 animate__animated animate__fadeInUp animate__delay-2s">
          {wipBooks.map((book) => (
            <BookCard key={book.title} book={book} wip />
          ))}
        </div>
      </div>
    </>
  );
}

const BookCard = ({
  book,
  wip,
}: {
  book: MappedBookListing;
  wip?: boolean;
}) => {
  wip ??= false;

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
              <span>Buy on</span>{" "}
              <FontAwesomeIcon icon={faAmazon} className="mt-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
