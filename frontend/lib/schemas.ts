import z from "zod";

export const HABITAT_MAX_LENGTH = 20;
export const BEHAVIOUR_MAX_LENGTH = 120;

const NumericField = z
  .union([z.string(), z.number()], { error: "Obligatorisk" })
  .pipe(z.coerce.number("Obligatorisk"));

const DateField = z.string().pipe(z.coerce.date("Obligatorisk"));

export const getObservationSchema = () =>
  z.object({
    beingId: NumericField.pipe(
      z
        .number("Obligatorisk.")
        .int("Obligatorisk")
        .nonnegative("Obligatorisk."),
    ),
    date: DateField.pipe(
      z.date().max(new Date(), { error: "Välj datum som har gått." }),
    ),
    municipalityId: z
      .string("Obligatorisk")
      .regex(/[0-9]{4}/, { error: "Ogiltig ort, försök igen." }),
    habitat: z.string().max(HABITAT_MAX_LENGTH, {
      error: `Förkorta texten till ${HABITAT_MAX_LENGTH} tecken eller mindre.`,
    }),
    behaviour: z.string().max(BEHAVIOUR_MAX_LENGTH, {
      error: `Förkorta texten till ${BEHAVIOUR_MAX_LENGTH} tecken eller mindre.`,
    }),
  });
