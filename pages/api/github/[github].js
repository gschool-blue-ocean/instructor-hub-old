// import postgres from "postgres";

// // const { DB_CONNECTION_URL, PORT, NODE_ENV } = process.env;
// const sql = postgres(
//   process.env.DB_CONNECTION_URL,
//   process.env.NODE_ENV === "production"
//     ? {
//         ssl: { rejectUnauthorized: false },
//         // max_lifetime: 60 * 30,
//       }
//     : {}
// );

// export default async function patchGithubAccount(req, res) {
//     let id = req.query.github
//     console.log(id)
//   if (req.method === "PATCH") {
//       try {
//           const { github } = req.body
//       const patchGitty = await sql`
//       UPDATE students SET github = ${github}
//             WHERE student_id = ${id} RETURNING *`;
//       res.send(patchGitty);
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ msg: "Messed up on our end" });
//     }
//   } else {
//     res.status(400).json({ msg: "You messed up" });
//   }
// }