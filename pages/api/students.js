// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dotenv from "dotenv";
import postgres from "postgres";

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

export default async function studentsHandler(req, res) {
  if (req.method === "GET") {
    try {
      const students = await sql`
      SELECT * FROM students`;
      res.status(200).json({ students });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { student_id } = req.params.id;
      console.log(student_id);
      const deleteStudent =
        await sql`DELETE FROM students WHERE student_id = ${student_id} RETURNING *;`;
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
