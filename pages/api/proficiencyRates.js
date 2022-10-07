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

export default async function proficiencyRatesHandler(req, res) {
  if (req.method === "GET") {
    try {
      const projects = await sql`
      SELECT * FROM proficiency_rates;`;
      res.status(200).json({ projects });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { skill_id, skill_descr } = req.body;
      console.log(req.body);
      const createProjects = await sql`
               INSERT INTO proficiency_rates ( skill_id, skill_descr ) VALUES ( ${skill_id}, ${skill_descr}) RETURNING *`;
      res.status(200).json({ createProjects });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
