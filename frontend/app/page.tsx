import Pagination from "@/components/pagination";
import { createUrlSearchParams } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import chrysanthemes from "@/public/auriol-chrysanthemes.png";
import { getObservations } from "@/lib/api";
import ObservationCard from "@/components/observation-card";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const query = createUrlSearchParams(params);
  const { page } = params;
  const { observations, pages } = await getObservations({
    page: page,
    expand: ["being", "municipality"],
  });
  console.log(observations);

  return (
    <div className="relative min-block-svh ">
      <header className="relative mx-fluid">
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
      <section className="mx-fluid-xl">
        <div className="min-block-svh grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 my-16">
          {observations.map((obs) => (
            <ObservationCard key={obs.id} observation={obs} />
          ))}
        </div>
        <Pagination query={query} last={pages} />
      </section>
    </div>
  );
}
