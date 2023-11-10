import connectDB from '../../databases/db'; // Import the database connection function
import Note from '../../models/note'; // Import the Note model

connectDB(); // Call the database connection function to establish the connection

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      const { title, sem, subject, info } = req.body
      const pdfUrl = req.body.pdfUrl;

      console.log('Received data:', req.body);
      console.log('title:', title);
      console.log('sem:', sem);
      console.log('subject:', subject);
      console.log('info:', info);
      console.log('pdfUrl:', pdfUrl);

      const newNote = new Note({
        title,
        sem,
        subject,
        info,
        pdfUrl,
      });

      console.log('New Note:', newNote.toObject());

      await newNote.save();
      return res.status(201).json({ message: 'Resource uploaded successfully' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}
