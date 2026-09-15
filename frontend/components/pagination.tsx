import Link from "next/link";
import FleuronLeft from "./fleuron-left";
import FleuronRight from "./fleuron-right";

interface PaginationProps {
  query: URLSearchParams;
  last: number;
}
export default function Pagination({ query, last }: PaginationProps) {
  const current: number = Number(query.get("page") || 1);
  const previous: number = ((current + last - 2) % last) + 1;
  const next: number = (current % last) + 1;

  const href = (query: URLSearchParams, page: number) => {
    query.set("page", page.toString());
    return query.toString();
  };

  return (
    <nav className="flex justify-center items-center gap-4 bg-theme-200 text-theme-900 text-fluid-2xl my-4 rounded-lg border border-theme-300">
      <Link
        href={{ pathname: "/", query: href(query, previous) }}
        aria-label={`sida ${previous}`}
        scroll={false}
        className="hover:text-accent-orange focus-visible:text-accent-orange"
      >
        <FleuronLeft className="size-[1em]" />
      </Link>
      <p className="inline-[6ch] text-center">{`${current} av ${last}`}</p>
      <Link
        href={{ pathname: "/", query: href(query, next) }}
        scroll={false}
        aria-label={`sida ${next}`}
        className="hover:text-accent-orange focus-visible:text-accent-orange"
      >
        <FleuronRight className="size-[1em]" />
      </Link>
    </nav>
  );
}
