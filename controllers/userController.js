import User from '../models/userModel';

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
            status: 'failed',
        });
    }
}

export async function createUser(req, res) {
    try {
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