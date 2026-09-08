import data from "./observations.json" with { type: "json" };

const NUM_ENTRIES: number = 144;
const earliestDate: number = new Date("2018-01-01").valueOf();
const latestDate: number = new Date().valueOf();
const firstId: number = data.observations.length;
const muncicipalities = data.municipalities;
const beings = data.beings;
const habitats = [
  "fjäll",
  "fjällen",
  "glaciär",
  "snölega",
  "klippa",
  "rasmark",
  "buskmark",
  "sjö",
  "sjöstrand",
  "sjöbotten",
  "mossa",
  "hed",
  "sandstrand",
  "lerstrand",
  "klippstrand",
  "lagun",
  "vik",
  "små öar",
  "äng",
  "skogen",
  "skog",
  "tallskog",
  "barrskog",
  "ängsgranskog",
  "lövskog",
  "lövsumpskog",
  "fuktlövskog",
  "kärr",
  "våtmark",
  "källa",
  "källkärr",
  "agkärr",
  "myr",
  "grotta",
  "havsgrotta",
  "fjällbjörkskog",
  "åsbarrskog",
  "ekskog",
  "ädellöv",
  "svämlövskog",
  "svämädellövskog",
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

console.log("[");
for (let i = 0; i < NUM_ENTRIES; i++) {
  const date = new Date(getRandomInt(earliestDate, latestDate));
  date.setMilliseconds(0);
  date.setSeconds(0);
  const observation = {
    id: firstId + i,
    beingId: getRandomInt(0, beings.length),
    date: date.toISOString(),
    municipalityId: muncicipalities[getRandomInt(0, muncicipalities.length)].id,
    amount: getRandomInt(1, 3) + getRandomInt(0, 2),
    habitat: habitats[getRandomInt(0, habitats.length)],
    behaviour: "",
  };
  console.log(JSON.stringify(observation), ",");
}
console.log("]");
