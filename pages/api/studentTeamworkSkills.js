import postgres from "postgres";

const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
const sql = postgres(
  process.env.DB_CONNECTION_URL,
  process.env.NODE_ENV === "production"
    ? {
        ssl: { rejectUnauthorized: false },
        // max_lifetime: 60 * 30,
      }
    : {}
);

export default async function studentTeamworkSkillsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const studentTeamworkSkills = await sql`
      SELECT * FROM student_teamwork_skills`;
      res.status(200).json({ studentTeamworkSkills });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { student_id, score, record_date } = req.body;
      const createStudentTeamworkSkills = await sql`
               INSERT INTO student_teamwork_skills ( student_id, score, record_date ) VALUES ( ${student_id}, ${score}, NOW()) RETURNING *`;
      res.status(200).json({ createStudentTeamworkSkills });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
