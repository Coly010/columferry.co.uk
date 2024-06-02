import type {MetaFunction} from "@remix-run/node";

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
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
            <h1 className="text-3xl text-blue-500">Welcome to Remix</h1>
        </div>
    );
}
