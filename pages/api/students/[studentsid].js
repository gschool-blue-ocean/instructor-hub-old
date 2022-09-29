import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();
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

export default async function getStudents(req, res) {
  const id = req.query.studentsid;
  console.log(id);
  console.log(req.body);
  if (req.method === "DELETE") {
    try {
      const deleteStudents = await sql`
               DELETE FROM students WHERE student_id = ${id}`;
      res.status(200).json({ deleteStudents });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "PATCH") {
    try {
      const patchStudents = await sql`
            UPDATE students SET name_first = ${req.body.name_first} WHERE student_id = ${id}`;
      res.status(200).json({ patchStudents });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
