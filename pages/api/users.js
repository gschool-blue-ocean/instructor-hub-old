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

export default async function usersHandler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await sql`
      SELECT * FROM users`;
      res.status(200).json({ users });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        username,
        password,
        is_instructor,
        default_cohort,
        asana_access_token,
        cohort_asana_gid,
      } = req.body;
      console.log(req.body);
      const createUsers = await sql`
               INSERT INTO users (  username, password, is_instructor, default_cohort, asana_access_token, cohort_asana_gid )
               VALUES ( ${username}, ${password}, ${is_instructor}, ${default_cohort}, ${asana_access_token}, ${cohort_asana_gid}) 
               RETURNING *`;
      res.status(200).json(req.body);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
