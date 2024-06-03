import { useLoaderData } from "@remix-run/react";
import { books, type MappedBookListing } from "./books/books";
import { intlFormat } from "date-fns";
import { HighlightedText } from "~/libs/shared-ui/HighlightedText";
import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  return sortedBooks;
};

export default function Books() {
  const books = useLoaderData<typeof loader>();
  return (
    <div className="mt-4 pb-20">
      <h1 className="text-left text-3xl py-4 mt-4 font-bold animate__animated animate__fadeInUp animate__fast underline decoration-emerald-300 decoration-4">
        My published books
      </h1>
      <h2 className="text-xl text-slate-700 py-4 font-semibold animate__animated animate__fadeInUp animate__delay-1s">
        Here you will find a collection of the books I have written or that I am
        currently in the process of writing.
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-2 animate__animated animate__fadeInUp animate__delay-2s">
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}

const BookCard = ({ book }: { book: MappedBookListing }) => {
  return (
    <div className="block rounded-xl bg-white shadow border border-zinc-100 hover:shadow-lg hover:border hover:border-emerald-300 text-slate-700 transition">
      <div className="grid grid-cols-5 gap-4">
        <div className="hidden sm:block sm:col-span-2">
          <img
            src={book.image}
            alt={book.title}
            className="object-cover rounded-l-xl h-full"
          />
        </div>
        <div className="col-span-5 sm:col-span-3 text-slate-700 py-4 px-2">
          <h2 className="font-semibold text-2xl">{book.title}</h2>
          <span className="text-xs font-light pb-2">
            Published on <HighlightedText>{book.publishedDate}</HighlightedText>
          </span>
          <img
            src={book.image}
            alt={book.title}
            width={126}
            className="block mx-auto rounded-xl mt-6 sm:hidden"
          />
          <p className="pt-4 text-sm whitespace-pre-wrap">{book.blurb}</p>
          <a
            href={book.amazonLink}
            target="_blank"
            rel="noreferrer"
            className="flex justify-center items-center gap-2 p-2 mt-4 border border-amber-300 min-w-[48px] h-10 rounded-xl transition transform shadow active:scale-95 bg-amber-500 text-black hover:bg-amber-300 select-none"
          >
            <span>Buy on</span>{" "}
            <FontAwesomeIcon icon={faAmazon} className="mt-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
