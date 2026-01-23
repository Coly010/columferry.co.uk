import { AnchorHTMLAttributes } from "react";

export function InTextLink({
  children,
  baseTextSize,
  keepTextSize,
  ...props
}: {
  children: React.ReactNode;
  baseTextSize:
    | "text-xs"
    | "text-sm"
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-2xl";
  keepTextSize?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  let linkTextSize: string = keepTextSize
    ? baseTextSize === "text-xs"
      ? "text-xs decoration-2"
      : `${baseTextSize} decoration-4`
    : "text-lg decoration-4";
  if (!keepTextSize) {
    switch (baseTextSize) {
      case "text-xs":
        linkTextSize = "text-sm decoration-4";
        break;
      case "text-sm":
        linkTextSize = "text-md decoration-4";
        break;
      case "text-md":
        linkTextSize = "text-lg decoration-4";
        break;
      case "text-lg":
        linkTextSize = "text-xl decoration-4";
        break;
      case "text-xl":
        linkTextSize = "text-2xl decoration-4";
        break;
      case "text-2xl":
        linkTextSize = "text-3xl decoration-4";
        break;
      default:
        linkTextSize = "text-lg decoration-4";
        break;
    }
  }
  return (
    <a
      {...props}
      className={`${linkTextSize} font-bold underline decoration-emerald-500 text-emerald-500 underline-offset-4 transition hover:text-emerald-300 hover:decoration-emerald-300`}
    >
      {children}
    </a>
  );
}
