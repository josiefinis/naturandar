import { Metadata } from "next";
import references from "@/public/references.json";
import type { Reference } from "@/lib/types";

export const metadata: Metadata = {
  title: "Referenser",
  description: "Bild- och datakällor som används på sidan",
};

export default function ReferenserPage() {
  const { images } = references;
  return (
    <div className="px-fluid">
      <header>
        <h1 className="font-display text-fluid-2xl text-accent-yellow">
          Referenser
        </h1>
      </header>
      <section className="my-8">
        <h2 className="text-fluid-2xl">Bilder</h2>
        <ul className="text-fluid-xl px-4">
          {images
            .sort((a, b) => a.year.localeCompare(b.year))
            .sort((a, b) => a.author.localeCompare(b.author))
            .map((r: Reference) => (
              <li key={r.id}>
                <a className="link" href={r.url} target="_blank">
                  {`${r.author} (${r.year}) ${r.title}`}
                </a>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
