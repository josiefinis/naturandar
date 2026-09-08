import type { Observation } from "@/lib/types";
import { longDateTime } from "@/lib/utils";
import ornament from "@/public/art-nouveau-ornament.svg";
import frame from "@/public/art-nouveau-frame.svg";
import Image from "next/image";

export default function ObservationCard({
  observation,
}: {
  observation: Observation;
}) {
  const {
    being,
    date: isoDate,
    municipality,
    habitat,
    behaviour,
    image,
  } = observation;
  const date = new Date(isoDate);
  return (
    <article className="grid grid-rows-[3fr_4fr] bg-theme-300 text-theme-900 rounded-lg shadow-2xl border-theme-400 border p-4">
      <div className="relative aspect-4/3 flex flex-col justify-center items-center">
        <Image
          className="object-contain object-center opacity-24"
          src={frame}
          alt=""
          fill
        />
        {image && (
          <div className="relative h-49/64 w-10/11">
            <Image
              className="object-cover object-center opacity-30"
              src={image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>

      <div className="relative flex flex-col items-start px-fluid">
        <Image
          className="relative object-contain object-bottom-right opacity-12 pbs-8"
          src={ornament}
          alt=""
          fill
        />
        <div className="@container inline-full">
          <div className="grid rounded-lg text-fluid-2xl">
            <h2 className="text-fluid-5xl">{being?.title}</h2>
            <time className="order-first" dateTime={date.toISOString()}>
              {longDateTime.format(date)}
            </time>
            <p className="text-fluid-3xl">
              {municipality?.title} &mdash; {habitat}
            </p>
            <p>{behaviour}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
