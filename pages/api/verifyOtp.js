import mongodbConnect from '../../databases/app';
import { verifyOtp } from '../../controllers/otpController';


export default async function handler(req, res) {
    mongodbConnect();
    const { method } = req;
    switch (method) {
        case 'POST':
            verifyOtp(req, res);
            break;
        default:
            res.status(405).end({ err: `Method ${method} id not a method` });
    }
}