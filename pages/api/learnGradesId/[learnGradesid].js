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
export default async function getLearnGrades (req, res) { 
    const id = req.query.learnGradesid; 
    if (req.method === "GET") {
      try {
        const learnGradesId = await sql`
          SELECT * FROM learn_grades
          WHERE learn_grade_id = ${id}`;
        res.status(200).json(learnGradesId[0]);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Messed up on our end" });
      }
    } else if (req.method === "PATCH") {
      try {
        const { assessment_grade, student_id, assessment_id  } = req.body;
        const patchLearnGrade = await sql
                    `UPDATE learn_grades SET assessment_grade = ${assessment_grade}
                     WHERE learn_grade_id = ${id} RETURNING *`;
        res.send(patchLearnGrade[0]);
      } catch (error) {
        console.error("Bad news in index api: ", error);
        return res.status(500).json({ msg: "Messed up on our end" });
      }
     } else {
      res.status(400).json({ msg: "You messed up" });
    }

}