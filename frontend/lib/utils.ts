import { Municipality, MunicipalityGroup } from "./types";

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

export const shortDateTime = Intl.DateTimeFormat("sv-SE", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

// Group municipalities by region (Note: municipalities must be sorted by id).
export function groupMunicipalities(
  municipalities: Municipality[],
): MunicipalityGroup[] {
  const regions: Municipality[] = municipalities.splice(
    0,
    municipalities.findIndex((m) => m.type === "K"),
  );

  const groups: MunicipalityGroup[] = [];
  for (let i = regions.length - 1; i > 0; i--) {
    const regex = new RegExp(`^${regions[i - 1].id.slice(2)}[0-9]{2}$`);
    const group: MunicipalityGroup = {
      region: regions[i],
      municipalities: municipalities.splice(
        municipalities.findLastIndex((m) => regex.test(m.id)) + 1,
      ),
    };
    group.municipalities.sort(compareMunicipalityTitles);
    groups.push(group);
  }
  groups.sort(compareRegionIds);
  return groups;
}

export function compareMunicipalityTitles(a: Municipality, b: Municipality) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

export function compareRegionIds(a: MunicipalityGroup, b: MunicipalityGroup) {
  if (a.region.id < b.region.id) {
    return -1;
  }
  if (a.region.id > b.region.id) {
    return 1;
  }
  return 0;
}
