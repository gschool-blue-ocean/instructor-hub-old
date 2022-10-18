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

export default async function getStudents(req, res) {
    const id = req.query.users
 if (req.method === "PATCH") {
    try {
      const {
        username,
        password,
        default_cohort,
        asana_acces_token,
        gid
      } = req.body;
      const patchUsers = await sql`
      UPDATE users SET default_cohort = ${default_cohort}
            WHERE user_id = ${id} RETURNING *`;
      res.send(patchUsers[0]);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
      } else {
        res.status(400).json({ msg: "You messed up" });
      }
}