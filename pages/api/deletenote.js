// pages/api/deletenote.js
import dbConnect from '../../databases/app';
import Note from '../../models/note';
import cloudinary from 'cloudinary';
require("dotenv").config({ path: "config.env" });

cloudinary.config({  
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { note } = req.body;
      
      // Delete file from Cloudinary
      cloudinary.uploader.destroy(note.publicid, function(error, result) {
        if (error) {
          console.error('Error deleting file from Cloudinary:', error);
          return res.status(500).json({ error: 'Error deleting file from Cloudinary' });
        } else {
          console.log('File deleted from Cloudinary:', result);
        }
      });

      // Delete note from the database
      const deletedNote = await Note.findByIdAndDelete(note._id);

      if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }

      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
