import type { Metadata } from "next";
import { Menu } from "@/components/menu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Colum Ferry",
  description:
    "Colum Ferry. Senior Software Engineer at Nx. Building monorepo tooling and build systems to help your projects scale without sacrificing Developer Experience.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css"
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-emerald-50 to-white bg-no-repeat bg-cover">
        <main className="container mx-auto px-1 sm:px-4">
          <Menu />
          <div className="container md:max-w-screen-md flex flex-col mx-auto px-4">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
