import { getBeings, getMunicipalities } from "@/lib/api";
import type { Being, Municipality } from "@/lib/types";
import Link from "next/link";

export default async function AddObservationForm() {
  const groupStyle = "flex flex-col";
  const labelStyle = "text-fluid-lg px-2";
  const inputStyle = "input px-2 rounded";
  const beings: Being[] = await getBeings();
  const municipalities: Municipality[] = await getMunicipalities();

  return (
    <form className="flex flex-col gap-8 bg-theme-300 text-theme-900 text-fluid-xl m-8 p-8 border border-theme-500 rounded-lg shadow-xl">
      <div className={groupStyle}>
        <label htmlFor="being" className={labelStyle}>
          Väsen
        </label>
        <select
          className={`${inputStyle} py-2`}
          id="being"
          name="beingId"
          defaultValue=""
          required
        >
          <option value="" disabled>
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
          type="datetime-local"
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
          defaultValue=""
          required
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
          placeholder="t.ex. fjäll, strand, svämlövskog"
        />
      </div>
      <div className="flex flex-col text-fluid-lg">
        <label htmlFor="behaviour" className={labelStyle}>
          Beteende
        </label>
        <textarea className={inputStyle} id="behaviour" name="beteende" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Link
          className="button text-center border-2 border-theme-900/20 rounded-lg"
          href="/"
        >
          Avbryt
        </Link>
        <button className="button text-center border-2 border-theme-900/20 rounded-lg ">
          Skicka
        </button>
      </div>
    </form>
  );
}
