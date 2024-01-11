import mongodbConnect from '../../databases/app';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel';

export default async function handler(req, res) {
    mongodbConnect().catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
});
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { registrationNumber, password } = req.body;

  try {
    // Find the user by registration number
    const user = await User.findOne({ registrationNumber });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
      
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id ,username:user.name,email:user.email,registrationNumber:user.registrationNumber,profileUrl:user.profileUrl }, 'jwtkey', {
      expiresIn: '12h', // Token expiration time
    });

    // You can include additional user information in the token payload if needed

    res.status(200).json({ token, user: { name: user.name, email: user.email,registrationNumber: user.registrationNumber } });  //return value------------------------------
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
