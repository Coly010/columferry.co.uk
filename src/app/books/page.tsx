import { intlFormat } from "date-fns";
import { HighlightedText } from "@/components/highlighted-text";
import { InTextLink } from "@/components/in-text-link";
import { MarkdownContent } from "@/components/markdown-content";
import { getAllBooks, Book } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books | Colum Ferry",
  description:
    "Find all my written work and works in progress here. Look out for The Rise of Demons and more from Tutarium!",
  openGraph: {
    title: "Books | Colum Ferry",
    description:
      "Find all my written work and works in progress here. Look out for The Rise of Demons and more from Tutarium!",
  },
};

export default function Books() {
  const allBooks = getAllBooks().map((book) => ({
    ...book,
    formattedDate: book.publishedDate
      ? intlFormat(new Date(book.publishedDate), {
          month: "long",
          day: "2-digit",
          year: "numeric",
        })
      : undefined,
  }));

  const publishedBooks = allBooks
    .filter((b) => !b.wip)
    .sort((a, b) => {
      if (!a.publishedDate || !b.publishedDate) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });

  const wipBooks = allBooks.filter((b) => b.wip);

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
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </div>
      {wipBooks.length > 0 && (
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
            <HighlightedText>The Rise of Demons</HighlightedText> marks
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
              <BookCard key={book.slug} book={book} wip />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function BookCard({
  book,
  wip = false,
}: {
  book: Book & { formattedDate?: string };
  wip?: boolean;
}) {
  return (
    <div className="block rounded-xl bg-white shadow border border-zinc-100 hover:shadow-lg hover:border hover:border-emerald-300 text-slate-700 transition">
      <div className="grid grid-cols-5 gap-4">
        <div
          className={`hidden sm:block sm:col-span-2 ${wip ? "grid grid-cols-1 place-items-center place-content-center bg-emerald-100 rounded-l-xl" : ""}`}
        >
          {!wip && book.image ? (
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
          {!wip && book.formattedDate && (
            <span className="text-xs font-light pb-2">
              Published on{" "}
              <HighlightedText>{book.formattedDate}</HighlightedText>
            </span>
          )}
          {!wip && book.image && (
            <img
              src={book.image}
              alt={book.title}
              width={126}
              className="block mx-auto rounded-xl mt-6 sm:hidden"
            />
          )}
          <div className="pt-4 text-sm whitespace-pre-wrap prose prose-sm">
            <MarkdownContent content={book.content} />
          </div>
          {!wip && book.amazonLink && (
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
