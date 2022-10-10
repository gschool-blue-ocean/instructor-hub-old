import postgres from "postgres";

// const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
  process.env.DB_CONNECTION_URL,
  process.env.NODE_ENV === "production"
    ? {
        ssl: { rejectUnauthorized: false },
        // max_lifetime: 60 * 30,
      }
    : {}
);

export default async function getProjectsAndProjectGradesId(req, res) {
  const id = req.query.projectsAndProjectGradesid;
  console.log(id + "projectAndProjectGradesid");

  if (req.method === "GET") {
    try {
      const projectAndProjectGradesId = await sql`
        SELECT * FROM project_grades INNER JOIN projects ON projects.project_id = project_grades.project_id
        WHERE project_grades.student_id = ${id}`;
      res.status(200).json(projectAndProjectGradesId[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "PATCH") {
    try {
      const { project_passed, notes } = req.body;
      const patchProjectGrade = await sql`
                   UPDATE project_grades SET project_passed = ${project_passed}, notes = ${notes}
                   WHERE project_id = ${id}`;
      res.status(200).json(patchProjectGrade);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
