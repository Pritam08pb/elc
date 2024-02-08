// pages/api/notes.js
import connectDB from '../../databases/app';
import Note from '../../models/note';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const notes = await Note.find({});
      return res.status(200).json(notes);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}
