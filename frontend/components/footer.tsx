import Link from "next/link";

export default function Footer() {
  return (
    <footer className="min-block-50 px-fluid py-10 bg-accent-green-450 text-fluid-xl text-theme-900">
      <nav className="grid grid-cols-1">
        <Link
          className="hover:underline focus-visible:underline focus-visible:outline-none"
          href={"/bilder"}
        >
          bilder
        </Link>
        <Link
          className="hover:underline focus-visible:underline focus-visible:outline-none"
          href={"/palett"}
        >
          palett
        </Link>
      </nav>
    </footer>
  );
}
