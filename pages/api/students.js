// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  } else if (req.method === "POST") {
    try {
      const {
        student_id,
        name_first,
        name_last,
        learn_avg,
        tech_avg,
        teamwork_avg,
        server_side_test,
        client_side_test,
        cohort,
        cohort_id,
        ETS_date,
        github,
        ASANA_GID,
      } = req.body;
      console.log(req.body);
      const createStudent = await sql`
               INSERT INTO students (  name_first, name_last, learn_avg, tech_avg, teamwork_avg, server_side_test, client_side_test, cohort,cohort_id, ETS_date, github,
                ASANA_GID )
               VALUES ( ${name_first}, ${name_last}, ${learn_avg}, ${tech_avg}, ${teamwork_avg},${server_side_test}, ${client_side_test}, ${cohort}, ${cohort_id}, ${ETS_date}, ${github},
                ${ASANA_GID}) 
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
