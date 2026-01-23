"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  return (
    <nav className="flex items-center justify-between p-4 relative">
      <div>
        <h2 className="font-bold text-xl">Colum Ferry</h2>
      </div>
      <div className="fixed bottom-0 right-1/2 z-50 h-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2 lg:block lg:relative lg:transform-none lg:right-auto xl:absolute xl:w-full xl:-ml-4 xl:top-4 xl:flex xl:justify-center select-none">
        <div className="pointer-events-auto rounded-xl w-96 h-10 p-0.5 bg-white border border-zinc-300 shadow-sm flex justify-between items-center gap-x-1">
          <NavPill href="/">Home</NavPill>
          <NavPill href="/blog">Blog</NavPill>
          <NavPill href="/books">Books</NavPill>
          <NavPill href="/tutarium">Tutarium</NavPill>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <MenuButton href="https://github.com/Coly010">
          <GithubIcon />
        </MenuButton>
        <MenuButton href="https://x.com/FerryColum">
          <XIcon />
        </MenuButton>
        <MenuButton href="https://www.amazon.co.uk/stores/Colum-Ferry/author/B0BRT1WQGB">
          <AmazonIcon />
        </MenuButton>
      </div>
    </nav>
  );
}

function NavPill({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center justify-center rounded-xl w-full h-full font-semibold text-lg no-underline hover:no-underline hover:bg-zinc-100 transition ${isActive ? "bg-zinc-100" : ""}`}
    >
      {children}
    </Link>
  );
}

function MenuButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex justify-center items-center p-2 border border-zinc-300 min-w-[48px] h-10 rounded-xl transition transform shadow active:scale-95 bg-white text-black hover:bg-zinc-100 select-none"
    >
      {children}
    </a>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function AmazonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M.045 18.02c.072-.116.187-.124.348-.022 2.344 1.47 4.882 2.204 7.612 2.204 1.826 0 3.574-.326 5.244-.977.275-.107.496-.024.662.248.166.272.048.498-.356.677-1.762.78-3.674 1.17-5.736 1.17-2.968 0-5.61-.79-7.93-2.37-.178-.122-.228-.272-.148-.45l.304-.48zm10.09-1.712c-.152 0-.238-.063-.258-.19l-.026-.252c-.16-1.188-.398-1.88-.716-2.076-.196-.12-.504-.18-.924-.18h-.676c-.06 0-.09.03-.09.09v2.458c0 .18.046.3.14.358.094.058.31.088.65.088h.19c.098 0 .148.042.148.126v.332c0 .084-.05.126-.148.126h-3.566c-.098 0-.148-.042-.148-.126v-.332c0-.084.05-.126.148-.126h.192c.34 0 .556-.03.65-.088.094-.058.14-.178.14-.358V11.51c0-.18-.046-.298-.14-.356-.094-.058-.31-.09-.65-.09h-.192c-.098 0-.148-.04-.148-.126v-.332c0-.084.05-.126.148-.126h3.566c.098 0 .148.042.148.126v.332c0 .086-.05.126-.148.126h-.19c-.34 0-.556.032-.65.09-.094.058-.14.176-.14.356v1.968c0 .06.03.09.09.09h.676c.334 0 .578-.026.732-.08.154-.054.294-.176.42-.368l.78-1.17c.162-.248.262-.4.3-.454.038-.054.076-.082.114-.082h.38c.098 0 .148.042.148.126v.332c0 .06-.024.104-.072.134l-1.256 1.53c-.096.11-.146.18-.146.21 0 .04.036.09.108.152.392.354.62.792.684 1.314l.036.33c.006.06.016.106.028.14.02.046.058.068.114.068.046 0 .104-.03.174-.092.07-.062.15-.128.24-.198a.55.55 0 0 1 .27-.104c.078 0 .124.05.138.148v.306c0 .078-.034.152-.104.222-.252.25-.594.434-1.028.548-.13.034-.252.052-.362.052z" />
      <path d="M21.54 19.104c-.134-.08-.334-.04-.6.12-.7.418-1.436.756-2.208 1.014-.098.032-.14.09-.126.174l.03.196c.014.084.068.116.162.096.62-.13 1.276-.376 1.968-.738.382-.202.594-.386.636-.55.042-.166-.028-.282-.21-.348l.348.036z" />
    </svg>
  );
}
