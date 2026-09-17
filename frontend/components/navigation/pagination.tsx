import Link from "next/link";
import FleuronLeft from "@/components/svg/fleuron-left";
import FleuronRight from "@/components/svg/fleuron-right";

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
    <nav className="flex justify-center items-center gap-4 bg-theme-300 text-theme-900 text-fluid-2xl my-4 rounded-lg border border-theme-400">
      <h2 className="sr-only">Sida</h2>
      <p className="order-2 inline-[6ch] text-center">{`${current} av ${last}`}</p>
      <Link
        href={{ pathname: "/", query: href(query, previous) }}
        aria-label={`sida ${previous}`}
        scroll={false}
        className="order-1 hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none"
      >
        <FleuronLeft className="size-[1em]" />
      </Link>
      <Link
        href={{ pathname: "/", query: href(query, next) }}
        scroll={false}
        aria-label={`sida ${next}`}
        className="order-3 hover:text-accent-orange focus-visible:text-accent-orange focus-visible:outline-none"
      >
        <FleuronRight className="size-[1em]" />
      </Link>
    </nav>
  );
}
