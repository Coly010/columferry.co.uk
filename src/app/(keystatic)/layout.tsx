import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keystatic Admin",
};

export default function KeystaticRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
