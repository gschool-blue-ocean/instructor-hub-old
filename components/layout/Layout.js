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

  useEffect(() => {
    axios.get("/api/cohorts").then((res) => setCohorts(res.data[0]));

    axios.get("/api/learn").then((res) => setLearn(res.data[0]));

    axios.get("/api/notes").then((res) => setNotes(res.data[0]));

    axios.get("/api/codingGroup").then((res) => setCodingGroup(res.data[0]));

    axios.get("/api/projects").then((res) => setProjects(res.data[0]));

    axios.get("/api/students").then((res) => setStudents(res.data[0]));

    axios
      .get("/api/assignedGroup")
      .then((res) => setAssignedGroup(res.data[0]));
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
