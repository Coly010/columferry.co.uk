import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import {type LinksFunction} from "@remix-run/node";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import stylesheet from "~/tailwind.css?url";
import {Menu} from "~/libs/shared-ui/Menu";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: stylesheet},
    {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"},
    {rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/brands.min.css"}
];

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body className="min-h-screen bg-gradient-to-b from-emerald-50 to-white bg-no-repeat bg-cover">
        <main className="container-lg mx-auto px-4">
            <Menu/>
            {children}
            <ScrollRestoration/>
        </main>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
