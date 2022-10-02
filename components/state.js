import { atom } from "recoil";

export const cohortsState = atom({
  key: "cohorts",
  default: [],
});

export const learnState = atom({
  key: "learn",
  default: [],
});

export const notesState = atom({
  key: "notes",
  default: [],
});

export const pairsState = atom({
  key: "pairs",
  default: [],
});

export const projectsState = atom({
  key: "projects",
  default: [],
});

export const studentsState = atom({
  key: "students",
  default: [],
});

export const colorArrState = atom ({
  key: 'color',
  default: '',
})
