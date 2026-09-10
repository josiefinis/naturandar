"use server";

import { createObservation } from "@/lib/api";
import { NewObservation } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createObservationAction(formData: FormData) {
  const beingId = formData.get("beingId") as string;
  const date = formData.get("date") as string;
  const municipalityId = formData.get("municipalityId") as string;
  const habitat = formData.get("habitat") as string;
  const behaviour = formData.get("behaviour") as string;

  const newObservation: NewObservation = {
    beingId: parseInt(beingId),
    date: new Date(date).toISOString(),
    municipalityId,
    habitat,
    behaviour,
  };

  createObservation(newObservation);

  revalidatePath("/");
  redirect("/");
}
