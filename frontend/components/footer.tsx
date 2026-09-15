import Link from "next/link";

export default function Footer() {
  return (
    <footer className="min-block-50 px-fluid-xl py-10 bg-accent-green-450 text-fluid-xl text-theme-900">
      <nav className="flex gap-16">
        <section className="flex flex-col">
          <h2 className="font-display">Naturandar</h2>
          <Link className="link" href={"/"}>
            Hem
          </Link>
          <Link className="link" href={"/om"}>
            Om
          </Link>
          <Link className="link" href={"/referenser"}>
            Referenser
          </Link>
        </section>
        <section className="flex flex-col">
          <h2 className="font-display">Länkar</h2>
          <a
            className="link"
            target="_blank"
            href={"https://sv.wikipedia.org/wiki/Naturande"}
          >
            Naturande på wikipedia
          </a>
          <a
            className="link"
            target="_blank"
            href={
              "https://commons.wikimedia.org/wiki/Category:Folklore_of_Scandinavia"
            }
          >
            Sagobilder
          </a>
        </section>
      </nav>
    </footer>
  );
}
