import Image from "next/image";
import Link from "next/link";
import { intlFormat } from "date-fns";
import { InTextLink } from "@/components/in-text-link";
import { HighlightedText } from "@/components/highlighted-text";
import { MarkdownContent } from "@/components/markdown-content";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";
import { getAllBooks, getAllUpdates } from "@/lib/content";

const TagColors: Record<string, string> = {
  tutarium: "bg-amber-300 text-black",
  "the rise of demons": "bg-blue-800 text-white",
  "word count": "bg-violet-400 text-black",
};

export default function Home() {
  const latestBook = getAllBooks()
    .filter((b) => !b.wip)
    .sort((a, b) => {
      if (!a.publishedDate || !b.publishedDate) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    })[0];

  const latestUpdate = getAllUpdates().sort(
    (a, b) =>
      new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
  )[0];

  return (
    <div className="my-10 text-slate-700">
      <h1 className="text-center sm:text-left text-3xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
        Hey, I&apos;m Colum
      </h1>
      <Image
        className="block sm:hidden my-2 rounded-xl w-[120px] h-[120px] mx-auto"
        src="/me.png"
        alt="Colum Ferry"
        width={120}
        height={120}
      />
      <div className="my-2 sm:my-8 text-slate-700 flex justify-between gap-2">
        <div className="w-full sm:w-1/2">
          <h3 className="text-xl py-4 font-semibold">
            A Senior Software Engineer, building monorepo tooling and build
            systems to help your projects scale with Typescript, Javascript,
            Node, Angular, React and Module Federation at{" "}
            <InTextLink
              href="https://nx.dev"
              target="_blank"
              baseTextSize="text-xl"
            >
              Nx
            </InTextLink>
            .
          </h3>
          <div className="text-lg py-4">
            <p>
              I&apos;m passionate about build tooling, frontend development and
              Module Federation. I also like to write blog posts and give tech
              talks on topics that I find interesting{" "}
              <em>(usually Module Federation)</em>!
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <Image
            className="rounded-xl"
            src="/me.png"
            alt="Colum Ferry"
            width={400}
            height={400}
          />
        </div>
      </div>

      {latestBook && (
        <div className="mt-8">
          <div className="flex justify-between items-baseline">
            <h2 className="text-left text-2xl py-4 font-bold underline decoration-emerald-300 decoration-4">
              Books
            </h2>
            <Link
              href="/books"
              className="underline font-medium decoration-emerald-500 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300"
            >
              View all books
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-xl bg-white shadow border border-zinc-100 text-slate-700">
              <div className="flex flex-row sm:flex-col">
                {latestBook.image && (
                  <img
                    src={latestBook.image}
                    alt={latestBook.title}
                    className="w-24 h-auto rounded-l-xl sm:rounded-l-none sm:rounded-t-xl sm:w-full sm:max-h-64 object-cover"
                  />
                )}
                <div className="py-4 px-3 flex-1">
                  <h3 className="font-semibold text-xl">{latestBook.title}</h3>
                  {latestBook.publishedDate && (
                    <span className="text-xs font-light">
                      Published on{" "}
                      <HighlightedText>
                        {intlFormat(new Date(latestBook.publishedDate), {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </HighlightedText>
                    </span>
                  )}
                  <div className="pt-3 text-sm line-clamp-4 prose prose-sm">
                    <MarkdownContent content={latestBook.content.split("\n\n")[0]} />
                  </div>
                  {latestBook.amazonLink && (
                    <a
                      href={latestBook.amazonLink}
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

            {latestUpdate && (
              <div className="rounded-xl bg-white shadow border border-zinc-100 text-slate-700 py-4 px-3">
                <h4 className="text-xs font-light italic mb-1">
                  Posted on{" "}
                  {intlFormat(new Date(latestUpdate.postedDate), {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </h4>
                <h3 className="font-semibold text-lg mb-2">{latestUpdate.title}</h3>
                <div className="text-sm font-light whitespace-pre-wrap prose prose-sm">
                  <MarkdownContent content={latestUpdate.content} />
                </div>
                <div className="flex gap-1 mt-4">
                  {latestUpdate.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${TagColors[tag.toLowerCase()] ?? "bg-emerald-300"} rounded-xl px-2 py-[1px] text-xs`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/tutarium"
                  className="inline-block mt-4 underline font-medium text-sm decoration-emerald-500 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300"
                >
                  More updates
                </Link>
              </div>
            )}
          </div>
          <div className="mt-6">
            <NewsletterSubscribe compact />
          </div>
        </div>
      )}
    </div>
  );
}
