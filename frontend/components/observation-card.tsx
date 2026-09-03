import type { Observation } from "@/lib/types";
import { splitMunicipalityId, longDateTime } from "@/lib/utils";

type ObservationCardProps = Omit<Observation, "id">;
export default function ObservationCard({
  title,
  date,
  municipalityId,
  amount,
  habitat,
  behaviour,
}: ObservationCardProps) {
  const { region, kommun } = splitMunicipalityId(municipalityId);
  return (
    <article>
      <h2>{title}</h2>
      <time dateTime={date.toISOString()}>{longDateTime.format(date)}</time>
      <p>{region}</p>
      <p>{kommun}</p>
      <p>{amount}</p>
      <p>{habitat}</p>
      <p>{behaviour}</p>
    </article>
  );
}
