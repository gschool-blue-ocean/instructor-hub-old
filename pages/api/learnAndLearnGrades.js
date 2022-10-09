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

export default async function learnAndLearnGradesHandler(req, res) {
  if (req.method === "GET") {
    try {
      const learnAndLearnGrades = await sql`
      SELECT * FROM learn INNER JOIN learn_grades ON learn.assessment_id = learn_grades.assessment_id`;
      res.status(200).json(learnAndLearnGrades);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
