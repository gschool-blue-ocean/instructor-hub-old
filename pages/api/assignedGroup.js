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

export default async function assignedGroupingsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const studentGroupings = await sql`
      SELECT * FROM assigned_student_groupings`;
      res.status(200).json({ studentGroupings });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { student_id, group_id } = req.body;
      console.log(req.body);
      const assignGroup = await sql`
                 INSERT INTO assigned_student_groupings (student_id, group_id ) VALUES (${student_id}, ${group_id}) RETURNING *`;
      res.status(200).json(req.body);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
