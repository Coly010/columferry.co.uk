"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type PathSegment = {
  text: string;
  href: string;
};

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.replace(/^\//, "").split("/");

  const pathSegments: PathSegment[] = segments.map((s) => ({
    text: toTitleCase(s.replace(/(-|_)+/g, " ")),
    href: pathname.slice(0, pathname.indexOf(s) + s.length),
  }));

  return (
    <div className="mb-8 flex gap-2">
      {pathSegments.map((segment, index) => (
        <li
          key={`${segment.href}-${index}`}
          className="list-none flex justify-evenly gap-2 items-center"
        >
          {pathname === segment.href ? (
            <span>{segment.text}</span>
          ) : (
            <Link
              href={segment.href}
              className="underline decoration-emerald-500 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300"
            >
              {segment.text}
            </Link>
          )}{" "}
          {index === pathSegments.length - 1 ? (
            ""
          ) : (
            <span className="text-xs text-slate-500">&gt;</span>
          )}
        </li>
      ))}
    </div>
  );
}
