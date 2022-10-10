import { useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import {
  cohortsState,
  learnState,
  notesState,
  codingGroupState,
  projectsState,
  studentsState,
  assignedGroupState,
  learnGradesState,
  projectGradesState,
  usersState,
  // currentCohortState,
  learnAndLearnGradesState,
  projectsAndProjectGradesState,
  proficiencyRatesState,
  studentTeamworkSkillsState,
  studentTechSkillsState,
  studentIdState,
  currentStudentState,
  currentlearnAndLearnGradesState,
  learnAndLearnGradesIdState,
} from "../state.js";
import { useRecoilState } from "recoil";
import axios from "axios";

const Layout = ({ children }) => {
  const [cohorts, setCohorts] = useRecoilState(cohortsState);
  const [learn, setLearn] = useRecoilState(learnState);
  const [notes, setNotes] = useRecoilState(notesState);
  const [codingGroup, setCodingGroup] = useRecoilState(codingGroupState);
  const [projects, setProjects] = useRecoilState(projectsState);
  const [students, setStudents] = useRecoilState(studentsState);
  const [assignedGroup, setAssignedGroup] = useRecoilState(assignedGroupState);
  const [learnGrades, setLearnGrades] = useRecoilState(learnGradesState);
  const [projectGrades, setProjectGrades] = useRecoilState(projectGradesState);
  const [users, setUsers] = useRecoilState(usersState);
  // const [currentCohort, setCurrentCohort] = useRecoilState(currentCohortState)
      
  const [learnAndLearnGrades, setLearnAndLearnGrades] = useRecoilState(learnAndLearnGradesState);
  const [projectsAndProjectGrades, setprojectsAndProjectGrades] = useRecoilState(projectsAndProjectGradesState);
  const [proficiencyRates, setProficiencyRates] = useRecoilState(proficiencyRatesState);
  const [studentTeamworkSkills, setStudentTeamworkSkills] = useRecoilState(studentTeamworkSkillsState);
  const [studentTechSkills, setStudentTechSkills] = useRecoilState(studentTechSkillsState);
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [currentStudent, setCurrentStudent] = useRecoilState(currentStudentState);
  const [currentLearnAndLearnGrades, setCurrentLearnAndLearnGrades] = useRecoilState(currentlearnAndLearnGradesState);
  const [learnAndLearnGradesId, setLearnAndLearnGradesId] = useRecoilState(learnAndLearnGradesIdState);
  
  useEffect(() => {
    axios.get("/api/cohorts").then((res) => {
      setCohorts(res.data.cohorts);
      // console.log(res.data.cohorts);
    });

    axios.get("/api/learn").then((res) => {
      setLearn(res.data.learn);
      // console.log(res.data.learn);
    });

    axios.get("/api/notes").then((res) => {
      // console.log(res);
      setNotes(res.data.notes);
      // console.log(res.data.notes);
    });

    axios.get("/api/codingGroups").then((res) => {
      // console.log(res);
      setCodingGroup(res.data.codingGroups);
      // console.log(res.data.codingGroups);
    });

    axios.get("/api/projects").then((res) => {
      setProjects(res.data.projects);
      // console.log(res.data.projects);
    });

    axios.get("/api/students").then((res) => {
      setStudents(res.data.students);
      // console.log(res.data.students);
    });

    axios.get("/api/learnGrades").then((res) => {
      setLearnGrades(res.data);
      // console.log(res.data);
    });

    axios.get("/api/projectGrades").then((res) => {
      setProjectGrades(res.data);
      // console.log(res.data);
    });

    axios.get("/api/assignedGroup").then((res) => {
      // console.log(res);
      setAssignedGroup(res.data.studentGroupings);
      // console.log(res.data.studentGroupings);
    });

    axios.get("/api/users").then((res) => {
      setUsers(res.data.users);
      // console.log(res.data.users);
    });

    axios.get("/api/learnAndLearnGrades").then((res) => {
      setLearnAndLearnGrades(res.data);
      // console.log(res.data);
    });

    axios.get("/api/projectsAndProjectGrades").then((res) => {
      setProjectsAndProjectGrades(res.data.projectsAndProjectGrades);
      // console.log(res.data.projectsAndProjectGrades);
    });

    axios.get("/api/proficiencyRates").then((res) => {
      setProficiencyRates(res.data.proficiencyRates);
      // console.log(res.data.proficiencyRates);
    });

    axios.get("/api/studentTeamworkSkills").then((res) => {
      setStudentTeamworkSkills(res.data.studentTeamworkSkills);
      // console.log(res.data.studentTeamworkSkills);
    });

    axios.get("/api/studentTechSkills").then((res) => {
      setStudentTechSkills(res.data.studentTechSkills);
      // console.log(res.data.studentTechSkills);
    });

    axios.get(`/api/students/${studentId}`).then((res) => {
      setCurrentStudent(res.data);
      // console.log(res.data);
    });
    
    axios
      .get(`/api/learnAndLearnGradesId/${learnAndLearnGradesId}`)
      .then((res) => {
        setCurrentLearnAndLearnGrades(res.data);
        //console.log(res.data);
      });
  }, []);

  // useEffect(() => {
  //   console.log(cohorts[0])
  // }, [cohorts])

  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
};

export default Layout;
