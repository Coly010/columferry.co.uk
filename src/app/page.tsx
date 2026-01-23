import Image from "next/image";
import { InTextLink } from "@/components/in-text-link";
import { HighlightedText } from "@/components/highlighted-text";

export default function Home() {
  return (
    <div className="my-10 text-slate-700">
      <h1 className="text-center sm:text-left text-3xl py-4 mt-4 font-bold underline decoration-emerald-300 decoration-4">
        Hey, I&apos;m Colum
      </h1>
      <Image
        className="block sm:hidden my-2 rounded-xl w-[120px] h-[120px] mx-auto"
        src="/me-small.jpg"
        alt="Colum Ferry speaking at Ng-DE"
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
            <p className="pt-6 font-light">
              Outside of work, I like to write fiction. You can find my first
              book{" "}
              <InTextLink
                baseTextSize="text-lg"
                href="https://www.amazon.co.uk/Blackstone-Legacy-Colum-Ferry-ebook/dp/B0BRJMC6K5"
              >
                The Blackstone Legacy
              </InTextLink>{" "}
              on Amazon. I&apos;m currently working on{" "}
              <HighlightedText>The Dark War Trilogy</HighlightedText>, the first
              in a series of books set in{" "}
              <HighlightedText>Tutarium</HighlightedText>, a mystical world
              permeated with a magical aura called{" "}
              <HighlightedText>The Essence</HighlightedText>.
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <Image
            className="rounded-xl"
            src="/me-ng-de.webp"
            alt="Colum Ferry speaking at Ng-DE"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
