import User from '../models/userModel';
import Admin from '../models/adminModel';

// delete after project completion
export async function getAllUser(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            length: users.length,
            data: users,
        });
    } catch (error) {
        res.status(405).json({
            status: 'fail',
        });
    }
}

export async function createUser(req, res) {
    try {
        if (req.body.registrationNumber.length < 10)
            return res.status(200).json({
                status: 'fail',
                message: 'Invalid Registration Number',
            });
        const user = await User.create(req.body);
        res.status(200).json({
            status: 'success',
            user,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
}

export async function createAdmin(req, res) {
    try {
        if (req.body.registrationNumber.length < 10)
            return res.status(200).json({
                status: 'fail',
                message: 'Invalid Registration Number',
            });
        const admin = await Admin.create(req.body);
        res.status(200).json({
            status: 'success',
            admin,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
}