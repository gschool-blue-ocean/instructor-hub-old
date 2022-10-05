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

export default async function getStudents(req, res) {
  const id = req.query.studentsId;

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
      const {
        name_first,
        name_last,
        learn_avg,
        project_avg,
        server_side_test,
        client_side_test,
        soft_skills,
        cohort,
        ETS_date,
      } = req.body;
      const patchStudents = await sql`
            UPDATE students SET name_first = ${name_first}, name_last = ${name_last}, learn_avg = ${learn_avg}, project_avg = ${project_avg}, server_side_test = ${server_side_test}, client_side_test = ${client_side_test}, soft_skills = ${soft_skills}, cohort = ${cohort}, ETS_date = ${ETS_date} 
            WHERE student_id = ${id}`;
      res.status(200).json({ patchStudents });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}
