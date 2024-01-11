// pages/api/updateProfileUrl.js
import connectDb from '../../databases/app';
import Admin from '../../models/adminModel';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, profileUrl } = req.body;

  try {
    await connectDb();

    // Update the user's profileUrl
    await Admin.findByIdAndUpdate(userId, { profileUrl });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating profileUrl:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
