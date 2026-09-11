"use client";

import type { FormState, RawData } from "@/app/iakttagelser/actions";
import type { Being, Municipality } from "@/lib/types";
import { createObservationAction } from "@/app/iakttagelser/actions";
import { useActionState } from "react";
import Link from "next/link";
import SubmitButton from "./submit-button";
import { shortDateTime } from "@/lib/utils";

const initialState: FormState = {};

interface AddObservationFormProps {
  beings: Being[];
  municipalities: Municipality[];
}
export default function AddObservationForm({
  beings,
  municipalities,
}: AddObservationFormProps) {
  const groupStyle = "flex flex-col";
  const labelStyle = "text-fluid-lg px-2";
  const inputStyle = "input px-2 rounded";

  const [state, formAction] = useActionState(
    createObservationAction,
    initialState,
  );
  const rawData: RawData = state.rawData ?? {};
  const { beingId, date, municipalityId, habitat, behaviour } = rawData;

  return (
    <form
      className="flex flex-col gap-8 bg-theme-300 text-theme-900 text-fluid-xl m-8 p-8 border border-theme-500 rounded-lg shadow-xl"
      action={formAction}
      key={JSON.stringify(rawData)}
    >
      <div className={groupStyle}>
        <label htmlFor="being" className={labelStyle}>
          Väsen
        </label>
        <select
          className={`${inputStyle} py-2`}
          id="being"
          name="beingId"
          defaultValue={beingId ?? -1}
          //required
        >
          <option value={-1} disabled>
            Välj ett alternativ
          </option>
          {beings.map((being: Being) => (
            <option key={being.id} value={being.id}>
              {being.title}
            </option>
          ))}
        </select>
      </div>
      <div className={groupStyle}>
        <label htmlFor="date" className={labelStyle}>
          Datum
        </label>
        <input
          className={inputStyle}
          id="date"
          name="date"
          required
          defaultValue={date}
          type="datetime-local"
          max={shortDateTime.format(new Date())}
        />
      </div>
      <div className={groupStyle}>
        <label htmlFor="place" className={labelStyle}>
          Ort
        </label>
        <select
          className={`${inputStyle} py-2`}
          id="place"
          name="municipalityId"
          required
          defaultValue={municipalityId ?? ""}
        >
          <option value="" disabled>
            Välj ett alternativ
          </option>
          {municipalities.map((m: Municipality) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
      </div>
      <div className={groupStyle}>
        <label htmlFor="habitat" className={labelStyle}>
          Habitat
        </label>
        <input
          className={inputStyle}
          id="habitat"
          name="habitat"
          maxLength={20}
          defaultValue={habitat ?? ""}
          placeholder="t.ex. fjäll, strand, svämlövskog"
        />
      </div>
      <div className="flex flex-col text-fluid-lg">
        <label htmlFor="behaviour" className={labelStyle}>
          Beteende
        </label>
        <textarea
          className={inputStyle}
          id="behaviour"
          name="behaviour"
          maxLength={120}
          defaultValue={behaviour ?? ""}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link
          className="button text-center border-2 border-theme-900/20 rounded-lg"
          href="/"
        >
          Avbryt
        </Link>
        <SubmitButton className="button text-center border-2 border-theme-900/20 rounded-lg" />
      </div>
      <p aria-live="polite" className="text-fluid-lg text-center">
        {state?.error}
      </p>
    </form>
  );
}
