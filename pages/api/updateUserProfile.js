// pages/api/updateProfileUrl.js
import connectDb from '../../databases/app';
import User from '../../models/userModel';
import cloudinary from 'cloudinary';

require("dotenv").config({ path: "config.env" });
 
cloudinary.config({  
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, profileUrl, publicid } = req.body;

  try {
    await connectDb(); 
    const user = await User.findById(userId);

    const publicId = user.publicid;

    // Delete the previous profile image from Cloudinary
    cloudinary.uploader.destroy(publicId, function(result) {
      console.log(result);
    });

    // Update the user's profileUrl
    await User.findByIdAndUpdate(userId, { profileUrl, publicid });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating profileUrl:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
