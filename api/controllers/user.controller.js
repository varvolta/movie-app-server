import User from '../models/user.model.js';
import { generateToken } from '../utils.js';

class UserController {
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = generateToken(user._id, user.role);

            res.status(200).json({
                message: 'User logged in successfully',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                },
            });
        } catch (err) {
            res.status(500).json({
                message: 'Server error',
                error: err.message,
            });
        }
    }
    static async register(req, res) {
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            user = new User({ email, password });
            await user.save();
            console.log(user);
            const token = generateToken(user._id, user.email);

            res.status(201).json({
                message: 'User registered successfully',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                },
            });
        } catch (err) {
            res.status(500).json({
                message: 'Server error',
                error: err.message,
            });
        }
    }
}

export default UserController;
