import mongodbConnect from "../../databases/app";
import Admin from "../../models/adminModel";

export default async function handler(req, res) {
  mongodbConnect().catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  });
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { senderid } = req.body;
  try {
          
          const adminData = await Admin.findById(senderid);
    
          if (!adminData) {
            return res.status(404).json({ error: 'User profile not found' });
          }
    
          // If user profile data found, send it as a response
          return res.status(200).json(adminData);
        } catch (error) {
          console.error('Error:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

}
