import Link from "next/link";

const navLinks = [
  { href: "/", label: "iakttagelser" },
  { href: "/?element=jord", label: "jorden" },
  { href: "/?element=vatten", label: "vattnet" },
  { href: "/?element=luft", label: "luften" },
  { href: "/?element=eld", label: "elden" },
];

export default function MainNav() {
  return (
    <nav className="flex justify-center gap-4 md:gap-12 items-center block-min | font-serif text-fluid-xl text-theme-900 bg-theme-200 ">
      {navLinks.map((link) => (
        <Link className="link" key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
