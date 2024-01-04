import mongodbConnect from '../../databases/app';
import { createAdmin } from '../../controllers/userController';

export default async function handler(req, res) {
    mongodbConnect().catch(() => {
        res.status(404).json({ err: 'Error in the connection' });
    });
    const { method } = req;
    switch (method) {
        case 'POST':
            createAdmin(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}