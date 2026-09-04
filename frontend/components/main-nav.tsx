import Link from "next/link";

const navLinks = [
  { href: "/", label: "iakttagelser" },
  { href: "/?element=jorden", label: "jorden" },
  { href: "/?element=vattnet", label: "vattnet" },
  { href: "/?element=luften", label: "luften" },
  { href: "/?element=elden", label: "elden" },
];

export default function MainNav() {
  return (
    <nav className="flex justify-center gap-4 md:gap-12 items-center block-min | font-serif text-fluid-xl text-theme-900 bg-theme-200 ">
      {navLinks.map((link) => (
        <Link
          className="hover:underline focus-visible:outline-none focus-visible:underline"
          key={link.href}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
