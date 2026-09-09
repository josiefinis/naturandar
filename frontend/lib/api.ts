import { ApiError } from "./errors";
import { Being, Municipality, ObservationsResponse } from "@/lib/types";
const API_URL = "http://localhost:4000";
const DEFAULT_LIMIT = "8";

async function queryApi<T>(
  endpoint: string,
  query?: URLSearchParams,
): Promise<T> {
  const url = `${API_URL}/${endpoint}${query && `?${query.toString()}`}`;
  const res = await fetch(url);
  if (!res.ok) {
    const context = { status: res.status, url: res.url };
    throw new ApiError("Fetch failed", { context: context });
  }
  return await res.json();
}

export async function getBeings(): Promise<Being[]> {
  return queryApi("beings");
}
export async function getMunicipalities(): Promise<Municipality[]> {
  return queryApi("municipalities");
}

interface GetObservationsOptions {
  page?: number | string;
  limit?: number | string;
  sort?: string;
  order?: string;
  expand?: string | string[];
  [key: string]: string | string[] | number | boolean | undefined;
}

// With help from https://github.com/Robert-Lexicon/projekt-agila-metoder-exempel/blob/main/lib/api.ts
export async function getObservations(
  options: GetObservationsOptions = {},
): Promise<ObservationsResponse> {
  const query = new URLSearchParams({
    _limit: DEFAULT_LIMIT,
  });

  Object.entries(options).forEach((entry) => {
    const [key, value] = entry;
    if (value !== "" && value !== undefined) {
      const apiKey = ["page", "limit", "sort", "order", "expand"].includes(key)
        ? `_${key}`
        : key;
      if (Array.isArray(value)) {
        value.forEach((v) => query.append(apiKey, String(v)));
      } else {
        query.set(apiKey, String(value));
      }
    }
  });

  return queryApi("observations", query);
}
