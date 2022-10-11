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

export default async function notesHandler(req, res) {
  if (req.method === "GET") {
    try {
      const notes = await sql`
      SELECT * FROM notes`;
      res.status(200).json(notes);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Messed up on our end" });
    }
  } else if (req.method === "POST") {
    try {
      const {
        student_id,
        instructor_notes,
        SEIR_notes,
        note_date,
      } = req.body;
      console.log(req.body);
      const createNotes = await sql`
        INSERT INTO notes (student_id, instructor_notes, SEIR_notes, note_date) VALUES (${student_id}, ${instructor_notes}, ${SEIR_notes}, ${note_date})
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
