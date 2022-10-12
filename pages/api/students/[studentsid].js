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
  const id = req.query.studentsid;
  // console.log(id);
  if (req.method === "DELETE") {
    try {
      const deleteStudents = await sql`
               DELETE FROM students WHERE student_id = ${id}`;
      res.status(200).json({ deleteStudents });
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "GET") {
    try {
      const student = await sql`
        SELECT * FROM students WHERE student_id = ${id}`;
      res.status(200).json(student[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "PATCH") {
    try {
      const {
        name_first,
        name_last,
        learn_avg,
        tech_avg,
        teamwork_avg,
        server_side_test,
        client_side_test,
        cohort,
        cohort_id,
        ets_date,
        github,
        gid
      } = req.body;
      const patchStudents = await sql`
      UPDATE students SET github = ${github}
            WHERE student_id = ${id}`;
      
      res.status(200).json(patchStudents);
    } catch (error) {
      console.error("Bad news in index api: ", error);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else {
    res.status(400).json({ msg: "You messed up" });
  }
}

// export async function githubPatch(req, res) {
//   if (req.method === "PATCH") {
//     try {
//       const patchGithub = await sql`
//       UPDATE students SET github = ${github}
//             WHERE student_id = ${id}`;
//       res.status(200).json(patchGithub);
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ msg: "Messed up on our end" });
//     }
//   } else {
//     res.status(400).json({ msg: "You messed up" });
//   }
// }

// UPDATE students SET name_first = ${name_first}, name_last = ${name_last}, learn_avg = ${learn_avg}, 
// tech_avg = ${tech_avg}, teamwork_avg = ${teamwork_avg}, server_side_test = ${server_side_test}, 
// client_side_test = ${client_side_test}, cohort = ${cohort}, cohort_id = ${cohort_id}, ets_date = ${ets_date}, 
// github = ${github}, gid = ${gid} 
// WHERE student_id = ${id}`;