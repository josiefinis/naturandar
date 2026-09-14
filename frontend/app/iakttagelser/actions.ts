"use server";

import z from "zod";
import { createObservation } from "@/lib/api";
import { getObservationSchema } from "@/lib/schemas";
import { NewObservation } from "@/lib/types";
import { revalidatePath } from "next/cache";

export interface RawData {
  beingId?: string;
  date?: string;
  municipalityId?: string;
  habitat?: string;
  behaviour?: string;
}

export type FormState = {
  status?: string;
  message?: string;
  errors?: Record<string, string | string[]>;
  rawData?: RawData;
  timestamp?: string;
};

export async function createObservationAction(
  _prevState: FormState,
  formData: FormData,
) {
  const rawData: RawData = Object.fromEntries(formData);
  const validatedFields = getObservationSchema().safeParse(rawData);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    const state: FormState = {
      status: "error",
      message: "Var god och fixa fel i formen.",
      errors: flattened.fieldErrors,
      rawData,
      timestamp: Date(),
    };
    return state;
  }

  const newObservation: NewObservation = validatedFields.data;

  try {
    await createObservation(newObservation);
    revalidatePath("/");
    const state: FormState = {
      status: "success",
      message: "Din iakttagelse har skickats.",
      timestamp: Date(),
    };
    return state;
  } catch {
    const state: FormState = {
      status: "error",
      message: "Något gick fel, försök igen senare.",
      rawData,
      timestamp: Date(),
    };
    return state;
  }
}
