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
export default async function getProjectGrades (req, res) { 
    const id = req.query.projectGradesid; 
    if (req.method === "GET") {
      try {
        const projectGradesId = await sql`
          SELECT * FROM project_grades 
          WHERE project_grades_id  = ${id}`;
        res.status(200).json(projectGradesId[0]);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Messed up on our end" });
      }
    } else if (req.method === "PATCH") {
      try {
        const { project_passed, notes, project_id, student_id } = req.body;
        const patchProjectGrade = await sql
                    `UPDATE project_grades SET project_passed = ${project_passed}
                     WHERE project_grades_id = ${id} RETURNING *`;
        res.send(patchProjectGrade[0]);
      } catch (error) {
        console.error("Bad news in index api: ", error);
        return res.status(500).json({ msg: "Messed up on our end" });
      }
     } else {
      res.status(400).json({ msg: "You messed up" });
    }

}