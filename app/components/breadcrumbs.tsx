import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

type PathSegment = {
  text: string;
  href: string;
};

export function Breadcrumbs() {
  const location = useLocation();
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);

  useEffect(() => {
    const pathSegments: PathSegment[] = [];
    const segments = location.pathname.replace(/^\//, "").split("/");
    for (const s of segments) {
      pathSegments.push({
        text: toTitleCase(s.replace(/(-|_)+/g, " ")),
        href: location.pathname.slice(
          0,
          location.pathname.indexOf(s) + s.length,
        ),
      });
    }
    setPathSegments(pathSegments);
  }, [location]);

  return (
    <>
      <div className="mb-8 flex gap-2">
        {pathSegments?.map((segment, index) => (
          <li
            key={`${segment.href}-${index}`}
            className="list-none flex justify-evenly gap-2 items-center"
          >
            {location.pathname === segment.href ? (
              <span>{segment.text}</span>
            ) : (
              <a
                href={segment.href}
                className="underline decoration-emerald-500 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300"
              >
                {segment.text}
              </a>
            )}{" "}
            {index === pathSegments.length - 1 ? (
              ""
            ) : (
              <span className="text-xs text-slate-500">&gt;</span>
            )}
          </li>
        ))}
      </div>
    </>
  );
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
