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
