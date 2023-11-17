import mongodbConnect from '../../database/app';
import { getAllUser } from '../../controllers/userController';

export default async function handler(req, res) {
    
    // Database connection
    mongodbConnect().catch(() => {
        res.status(404).json({ err: 'Error in the connection' });
    });

    // method checking
    const { method } = req;

    // function call from controllers
    switch (method) {
        case 'GET':
            getAllUser(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}