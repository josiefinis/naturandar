"use server";

import z from "zod";
import { createObservation } from "@/lib/api";
import { ObservationSchema } from "@/lib/schemas";
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
};

export async function createObservationAction(
  _prevState: FormState,
  formData: FormData,
) {
  const rawData: RawData = Object.fromEntries(formData);
  const validatedFields = ObservationSchema.safeParse(rawData);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    const state: FormState = {
      status: "error",
      message: "Var god och fixa fel i formen.",
      errors: flattened.fieldErrors,
      rawData,
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
    };
    return state;
  } catch {
    const state: FormState = {
      status: "error",
      message: "Något gick fel, försök igen senare.",
      rawData,
    };
    return state;
  }
}
