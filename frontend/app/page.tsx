import Pagination from "@/components/pagination";
import { createUrlSearchParams } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import chrysanthemes from "@/public/auriol-chrysanthemes.png";
import { getObservations } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = createUrlSearchParams(await searchParams);
  const { observations, pages } = await getObservations({
    expand: ["being", "municipality"],
  });
  console.log(observations);

  return (
    <div className="relative min-block-svh">
      <header className="relative mx-4 ">
        <h1 className="font-display text-fluid-4xl text-accent-yellow">
          Naturandar
        </h1>
        <Link
          className="text-fluid-xl text-theme-200"
          href="/beskriv-iakttagelse"
        >
          beskriv din iakttagelse
        </Link>
      </header>
      <Image
        className="object-cover -z-10 sm:object-top-left"
        src={chrysanthemes}
        alt=""
        loading="eager"
        fill
      />
      <section>
        {observations.map((obs) => (
          <p
            key={obs.id}
          >{`${obs.being?.title} ${obs.date} ${obs.municipality?.title}`}</p>
        ))}
        <div className="min-block-svh"></div>
        <Pagination query={query} last={pages} />
      </section>
    </div>
  );
}
