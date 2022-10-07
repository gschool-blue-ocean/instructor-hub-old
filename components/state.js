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

export const colorArrState = atom({
  key: "color",
  default: "",
});

export const learnGradesState = atom({
  key: "learn grades",
  default: [],
});

export const projectGradesState = atom({
  key: "project grades",
  default: [],
});

export const usersState = atom({
  key: "users",
  default: [],
});

export const learnAndLearnGradesState = atom({
  key: "learn and learn_grades",
  default: [],
});

export const projectsAndProjectGradesState = atom({
  key: "learn and learn_grades",
  default: [],
});

export const proficiencyRatesState = atom({
  key: "proficiency Rates",
  default: [],
});
