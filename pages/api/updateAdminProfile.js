// pages/api/updateProfileUrl.js
import connectDb from '../../databases/app';
import Admin from '../../models/adminModel';
import cloudinary from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'doirocccb', 
  api_key: '627298296818192', 
  api_secret: 'WJ2lh5eFtld0hVhL6fea7keHOtE' 
});

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, profileUrl, publicid } = req.body;

  

  try {
    await connectDb();
    const user = await Admin.findById(userId);

    const publicId = user.publicid;

    // Delete the previous profile image from Cloudinary
    cloudinary.uploader.destroy(publicId, function(result) {
      console.log(result);
    });

    // Update the user's profileUrl
    await Admin.findByIdAndUpdate(userId, { profileUrl, publicid });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating profileUrl:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
