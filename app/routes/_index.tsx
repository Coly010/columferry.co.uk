import type {MetaFunction} from "@remix-run/node";
import MeNgDe from '../assets/images/me-ng-de.webp';
import MeSmall from '../assets/images/me-small.jpg';

export const meta: MetaFunction = () => {
    return [
        {title: "Colum Ferry"},
        {
            name: "description",
            content: "Colum Ferry. Senior Software Engineer at Nx. Building monorepo tooling and build systems to help your projects scale without sacrificing Developer Experience. Building solutions both for and with Typescript, Javascript, Node, Angular, React, Module Federation, Bundlers."
        },
    ];
};

export default function Index() {
    return (
        <div className="my-10 text-slate-700">
            <h1 className="text-center sm:text-left text-3xl py-4 mt-4 font-semibold animate__animated animate__fadeInUp underline decoration-emerald-300 decoration-4">Hey,
                I'm
                Colum</h1>
            <img
                className="block sm:hidden my-2 rounded-xl w-[120px] h-[120px] mx-auto"
                src={MeSmall}
                alt="Colum Ferry speaking at Ng-DE"/>
            <div className="my-2 sm:my-8 text-slate-700 flex justify-between gap-2">
                <div className="w-full sm:w-1/2">
                    <h3 className="text-xl py-4 animate__animated animate__fadeInUp animate__delay-1s">A Senior Software
                        Engineer, building
                        monorepo tooling and build systems to help
                        your
                        projects scale with Typescript, Javascript, Node, Angular, React and Module Federation at <a
                            href="https://nx.dev"
                            className="text-2xl font-bold underline decoration-emerald-500 decoration-4 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300">Nx</a>.
                    </h3>
                    <div className="text-lg py-4 animate__animated animate__fadeInUp animate__delay-2s">
                        <p>I'm passionate about build
                            tooling, frontend development and Module Federation. I also like to write blog posts and
                            give
                            tech
                            talks
                            on topics that I find interesting <em>(usually Module Federation)</em>!</p>
                        <p className="pt-6">Outside of work, I like to write fiction. You can find my first book <a
                            href="https://www.amazon.co.uk/Blackstone-Legacy-Colum-Ferry-ebook/dp/B0BRJMC6K5"
                            className="text-xl font-semibold underline decoration-emerald-500 decoration-4 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300">The
                            Blackstone Legacy</a> on Amazon. I'm currently working <HighlightedText>The Dark War
                            Trilogy</HighlightedText>, the first in a series of books set
                            in <HighlightedText>Tutarium</HighlightedText>, a mystical world
                            permeated with a magical aura called <HighlightedText>The Essence</HighlightedText>.</p>
                    </div>
                </div>
                <div className="hidden sm:block animate__animated animate__fadeInUp animate__delay-1s"><img
                    className="rounded-xl"
                    src={MeNgDe}
                    alt="Colum Ferry speaking at Ng-DE"/></div>
            </div>
        </div>
    );
}

const HighlightedText = ({children}: { children: React.ReactNode }) => {
    return <span
        className="font-semibold underline decoration-emerald-500 decoration-4 underline-offset-4">{children}</span>
}
