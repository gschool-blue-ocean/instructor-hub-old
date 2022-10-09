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

export default async function getLearnAndLearnGradesId(req, res) {
  const id = req.query.learnAndLearnGradesid;
  console.log(id + "LearnAndLearnGradesId");

  if (req.method === "GET") {
    try {
      const learnAndLearnGradesId = await sql`
        SELECT * FROM learn_grades INNER JOIN learn ON learn_grades.assessment_id = learn.assessment_id
        WHERE learn_grades.student_id = ${id}`;
      res.status(200).json(learnAndLearnGradesId);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { assessment_grade } = req.body;
      const patchLearnGrades = await sql`
               UPDATE learn_grades SET assessment_grade = ${assessment_grade}
               WHERE assessment_id = ${id}`;
      res.status(200).json(patchLearnGrades);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { assessment_name } = req.body;
      const patchLearn = await sql`
             UPDATE learn SET assessment_name = ${assessment_name}
             WHERE assessment_id = ${id}`;
      res.status(200).json(patchLearn);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
