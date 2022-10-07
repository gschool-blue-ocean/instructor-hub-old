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
  learnAndLearnGradesState,
  projectsAndProjectGradesState,
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
  const [learnAndLearnGrades, setLearnAndLearnGrades] = useRecoilState(
    learnAndLearnGradesState
  );
  const [projectsAndProjectGrades, setprojectsAndProjectGrades] =
    useRecoilState(projectsAndProjectGradesState);

  useEffect(() => {
    axios.get("/api/cohorts").then((res) => {
      setCohorts(res.data.cohorts[0]);
      // console.log(res.data.cohorts[0]);
    });

    axios.get("/api/learn").then((res) => {
      setLearn(res.data.learn[0]);
      // console.log(res.data.learn[0]);
    });

    axios.get("/api/notes").then((res) => {
      // console.log(res);
      setNotes(res.data.notes[0]);
      // console.log(res.data.notes[0]);
    });

    axios.get("/api/codingGroups").then((res) => {
      // console.log(res);
      setCodingGroup(res.data.codingGroups[0]);
      // console.log(res.data.codingGroups[0]);
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
      setLearnGrades(res.data.learnGrades);
      // console.log(res.data.learnGrades);
    });

    axios.get("/api/projectGrades").then((res) => {
      setProjectGrades(res.data.projectGrades);
      // console.log(res.data.projectGrades);
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
      setLearnAndLearnGrades(res.data.learnAndLearnGrades);
      // console.log(res.data.learnAndLearnGrades);
    });

    axios.get("/api/projectsAndProjectGrades").then((res) => {
      setLearnAndLearnGrades(res.data.projectsAndProjectGrades);
      // console.log(res.data.projectsAndProjectGrades);
    });
  }, []);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
