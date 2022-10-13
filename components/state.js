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

export const currentCohortState = atom({
  key: "current cohort",
  default: ''
})

export const learnAndLearnGradesState = atom({
  key: "learn and learn_grades",
  default: [],
});

export const projectsAndProjectGradesState = atom({
  key: "projects And Project Grades",
  default: [],
});

export const proficiencyRatesState = atom({
  key: "proficiency Rates",
  default: [],
});

export const studentTeamworkSkillsState = atom({
  key: "student teamwork skills",
  default: [],
});

export const studentTechSkillsState = atom({
  key: "student tech skill",
  default: [],
});

export const studentIdState = atom({
  key: "student id",
  default: "1",
});

export const currentStudentState = atom({
  key: "current student",
  default: [],
});

export const learnAndLearnGradesIdState = atom({
  key: "learn and learn_grades id",
  default: "1",
});

export const currentlearnAndLearnGradesState = atom({
  key: "current learn and learn grades",
  default: [],
});

export const currStudentProjectsState = atom({
  key: 'currStudentProjects',
  default: [],
});

export const loggedIn = atom({
  key: 'loggedIn',
  default: false,
});

export const accessToken = atom({
  key: 'access token',
  default: ''
})

export const checkedPeopleState = atom({
  key: 'checked people',
  default: [],
});