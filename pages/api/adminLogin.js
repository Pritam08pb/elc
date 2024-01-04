import mongodbConnect from '../../databases/app';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../../models/adminModel';

export default async function handler(req, res) {
    mongodbConnect().catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
});
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { email, password } = req.body;

  try {
    // Find the user by registration number
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
      
    }

    // Generate JWT token
    const token = jwt.sign({ userId: admin._id ,username:admin.name,email:admin.email,registrationNumber:admin.registrationNumber }, 'jwtkey', {
      expiresIn: '12h', // Token expiration time
    });

    // You can include additional user information in the token payload if needed

    res.status(200).json({ token, user: { name: admin.name, email: admin.email,registrationNumber: admin.registrationNumber } });  //return value------------------------------
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
