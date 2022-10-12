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

export default async function codingGroupsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const codingGroups = await sql`
      SELECT * FROM coding_groups`;
      res.status(200).json(codingGroups);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { cohort_id } = req.body;
      console.log(req.body);
      const createGroup = await sql`
               INSERT INTO coding_groups ( cohort_id ) VALUES (${cohort_id}) RETURNING *`;
      res.status(200).json(createGroup);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
