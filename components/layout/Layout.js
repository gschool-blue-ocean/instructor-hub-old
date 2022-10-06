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
      setProjects(res.data.projects[0]);
      // console.log(res.data.projects[0]);
    });

    axios.get("/api/students").then((res) => {
      setStudents(res.data.students[0]);
      // console.log(res.data.students[0]);
    });

    axios.get("/api/learnGrades").then((res) => {
      setLearnGrades(res.data.learnGrades[0]);
      // console.log(res.data.learnGrades[0]);
    });

    axios.get("/api/projectGrades").then((res) => {
      setProjectGrades(res.data.projectGrades[0]);
      // console.log(res.data.projectGrades[0]);
    });

    axios.get("/api/assignedGroup").then((res) => {
      // console.log(res);
      setAssignedGroup(res.data.studentGroupings[0]);
      // console.log(res.data.studentGroupings[0]);
    });

    axios.get("/api/users").then((res) => {
      setUsers(res.data.students[0]);
      // console.log(res.data.students[0]);
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
