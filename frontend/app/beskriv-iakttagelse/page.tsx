import Image from "next/image";
import plume from "@/public/plume.jpg";

export default function BeskrivIakttagelsePage() {
  return (
    <div className="grid grid-cols-[3fr_1fr]">
      <div>
        <header>
          <h1 className="font-display text-fluid-2xl text-accent-yellow mx-4">
            Beskriv iakttagelse
          </h1>
        </header>
        <section></section>
      </div>
      <Image src={plume} alt="" loading="eager" />
    </div>
  );
}
