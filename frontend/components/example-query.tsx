interface Observation {
  title: string;
  date: string;
  municipalityId: string;
}

export default async function ExampleQuery() {
  const API_URL = "http://localhost:4000/";

  const GET_OBSERVATIONS_QUERY = `
    query GetObservations {
      observations {
        title
        date
        municipalityId
      }
    }
  `;

  const json = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: GET_OBSERVATIONS_QUERY,
    }),
  }).then((res) => res.json());

  const observations: Observation[] = json.data.observations;

  return (
    <div>
      {observations.map((obs) => (
        <p
          key={obs.title}
        >{`${obs.title} ${obs.date} ${obs.municipalityId}`}</p>
      ))}
    </div>
  );
}
