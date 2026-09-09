export function createUrlSearchParams(searchParams: {
  [key: string]: string | undefined;
}): URLSearchParams {
  const query = new URLSearchParams();
  Object.entries(searchParams).map((entry) => {
    const [key, value] = entry;
    if (value) {
      query.set(key, value);
    }
  });
  return query;
}

export function splitMunicipalityId(municipalityId: string): {
  region: string;
  kommun: string | null;
} {
  const region = `00${municipalityId.slice(0, 2)}`;
  const kommun = municipalityId;
  if (region === "0000") {
    return { region: municipalityId, kommun: null };
  } else {
    return { region: region, kommun: kommun };
  }
}

export const longDateTime = Intl.DateTimeFormat("sv-SE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});
