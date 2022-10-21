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

export default async function projectsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const projects = await sql`
      SELECT * FROM projects`;
      res.status(200).json(projects);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const { project_name, gid } = req.body;
      const createProjects = await sql`
               INSERT INTO projects (project_name, gid ) VALUES (${project_name}, ${gid}) RETURNING *`;
      res.status(200).json(createProjects[0]);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
