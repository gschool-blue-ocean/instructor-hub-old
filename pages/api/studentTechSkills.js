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

export default async function studentTechSkillsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const studentTechSkills = await sql`
      SELECT * FROM student_tech_skills`;
      res.status(200).json({ studentTechSkills });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { student_id, score, record_date } = req.body;
      console.log(req.body);
      const createStudentTechSkills = await sql`
               INSERT INTO student_tech_skills ( student_id, score, record_date ) VALUES ( ${student_id}, ${score}, ${record_date}) RETURNING *`;
      res.status(200).json({ createStudentTechSkills });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
