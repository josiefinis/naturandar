import Image from "next/image";
import plume from "@/public/plume.jpg";
import AddObservationForm from "@/components/add-observation-form";

export default function BeskrivIakttagelsePage() {
  return (
    <div className="relative">
      <Image
        className="relative object-contain object-bottom-right -z-1 invisible sm:visible"
        src={plume}
        alt=""
        loading="eager"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div>
        <header>
          <h1 className="font-display text-fluid-2xl text-accent-yellow mx-4">
            Beskriv iakttagelse
          </h1>
        </header>
        <section className="flex flex-col justify-center items-center">
          <AddObservationForm />
        </section>
      </div>
    </div>
  );
}
