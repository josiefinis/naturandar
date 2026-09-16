"use client";

import type { FormState, RawData } from "@/app/iakttagelser/actions";
import type { Being, Municipality, MunicipalityGroup } from "@/lib/types";
import { createObservationAction } from "@/app/iakttagelser/actions";
import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import SubmitButton from "./submit-button";
import { shortDateTime } from "@/lib/utils";
import PoliteMessage from "./polite-message";
import { BEHAVIOUR_MAX_LENGTH, HABITAT_MAX_LENGTH } from "@/lib/schemas";

const initialState: FormState = {};

interface AddObservationFormProps {
  beings: Being[];
  municipalities: MunicipalityGroup[];
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

  const errorMessages = state.errors ?? {};
  const {
    beingId: beingIdMessage,
    date: dateMessage,
    municipalityId: municipalityIdMessage,
    habitat: habitatMessage,
    behaviour: behaviourMessage,
  } = errorMessages;

  const messageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state?.message) {
      messageRef.current?.focus();
      window.scrollTo({ top: messageRef.current?.offsetTop ?? 0 });
    }
  }, [state?.message, state?.timestamp]);

  return (
    <form
      className="min-inline-[24ch] flex flex-col gap-8 bg-theme-300 text-theme-900 text-fluid-xl m-8 p-8 border border-theme-500 rounded-lg shadow-xl"
      action={formAction}
      key={state.timestamp}
      noValidate
    >
      <div ref={messageRef} className="focus-visible:outline-none">
        <PoliteMessage message={state?.message} />
      </div>
      <div className={groupStyle}>
        <label htmlFor="being" className={labelStyle}>
          Väsen
        </label>
        <select
          className={`${inputStyle} py-2`}
          id="being"
          name="beingId"
          defaultValue={beingId ?? -1}
          aria-invalid={Boolean(beingIdMessage)}
          aria-describedby="being-description"
          required
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
        <span
          id="being-description"
          className="error-message text-fluid-lg text-accent-red-700"
        >
          {beingIdMessage}
        </span>
      </div>

      <div className={groupStyle}>
        <label htmlFor="date" className={labelStyle}>
          Datum
        </label>
        <input
          className={inputStyle}
          id="date"
          name="date"
          type="datetime-local"
          defaultValue={date}
          aria-invalid={Boolean(dateMessage)}
          aria-describedby="date-description"
          max={shortDateTime.format(new Date())}
          required
        />
        <span
          id="date-description"
          className="error-message text-fluid-lg text-accent-red-700"
        >
          {dateMessage}
        </span>
      </div>

      <div className={groupStyle}>
        <label htmlFor="place" className={labelStyle}>
          Ort
        </label>
        <select
          className={`${inputStyle} py-2`}
          id="place"
          name="municipalityId"
          defaultValue={municipalityId ?? ""}
          aria-invalid={Boolean(municipalityIdMessage)}
          aria-describedby="place-description"
          required
        >
          <option value="" disabled>
            Välj ett alternativ
          </option>
          {municipalities.map((group: MunicipalityGroup) => (
            <optgroup
              key={group.region.id}
              className="font-medium font-display"
              label={group.region.title}
            >
              {group.municipalities.map((m: Municipality) => (
                <option key={m.id} className="font-serif" value={m.id}>
                  {m.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span
          id="place-description"
          className="error-message text-fluid-lg text-accent-red-700"
        >
          {municipalityIdMessage}
        </span>
      </div>

      <div className={groupStyle}>
        <label htmlFor="habitat" className={labelStyle}>
          Habitat
        </label>
        <input
          className={inputStyle}
          id="habitat"
          name="habitat"
          defaultValue={habitat ?? ""}
          placeholder="t.ex. fjäll, strand, träsk"
          aria-invalid={Boolean(habitatMessage)}
          aria-describedby="habitat-description"
          maxLength={HABITAT_MAX_LENGTH}
        />
        <span
          id="habitat-description"
          className="error-message text-fluid-lg text-accent-red-700"
        >
          {habitatMessage}
        </span>
      </div>

      <div className="flex flex-col text-fluid-lg">
        <label htmlFor="behaviour" className={labelStyle}>
          Beteende
        </label>
        <textarea
          className={inputStyle}
          id="behaviour"
          name="behaviour"
          defaultValue={behaviour ?? ""}
          aria-invalid={Boolean(behaviourMessage)}
          aria-describedby="behaviour-description"
          maxLength={BEHAVIOUR_MAX_LENGTH}
        />
        <span
          id="behaviour-description"
          className="error-message text-fluid-lg text-accent-red-700"
        >
          {behaviourMessage}
        </span>
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
    </form>
  );
}
