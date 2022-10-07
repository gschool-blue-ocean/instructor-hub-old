import postgres from "postgres";

const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
  process.env.DB_CONNECTION_URL,
  process.env.NODE_ENV === "production"
    ? {
        ssl: { rejectUnauthorized: false },
        max_lifetime: 60 * 30,
      }
    : {}
);

export default async function projectGradesHandler(req, res) {
  if (req.method === "GET") {
    try {
      const projectGrades = await sql`
      SELECT * FROM project_grades`;
      res.status(200).json({ projectGrades });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { student_id, project_id, project_grade } = req.body;
      console.log(req.body);
      const createProjectGrades = await sql`
               INSERT INTO project_grades ( student_id, project_id, project_grade )
               VALUES ( ${student_id}, ${project_id}, ${project_grade}) RETURNING *`;
      res.status(200).json({ createProjectGrades });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
