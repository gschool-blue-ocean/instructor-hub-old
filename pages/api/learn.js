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

export default async function learnHandler(req, res) {
  if (req.method === "GET") {
    try {
      const learn = await sql`
      SELECT * FROM learn`;
      res.status(200).json({ learn });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { assessment_id, assessment_name } = req.body;
      console.log(req.body);
      const createAssessment = await sql`
               INSERT INTO learn (  assessment_id, assessment_name ) VALUES ( ${assessment_id}, ${assessment_name}) RETURNING *`;
      res.status(200).json({ createAssessment });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
