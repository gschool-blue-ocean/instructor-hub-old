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

export const codingGroupState = atom({
  key: "coding group",
  default: [],
});

export const assignedGroupState = atom({
  key: "assigned group",
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
