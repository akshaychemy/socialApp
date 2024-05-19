import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json('User registered successfully');
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json('Invalid email or password');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).json({"token":token});
});

router.get('/profile', authenticateToken, async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
});


// Follow user route
router.post('/:id/follow', authenticateToken, async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        // const userToFollow12 = await User.find();
        // console.log("userToFollow12",userToFollow12)
        if (!userToFollow) return res.status(404).json('User not found');

        const currentUser = await User.findById(req.user._id);
        if (!currentUser.following.includes(userToFollow._id)) {
            currentUser.following.push(userToFollow._id);
            userToFollow.followers.push(currentUser._id);
            await currentUser.save();
            await userToFollow.save();
            res.json('User followed successfully');
        } else {
            res.status(400).json('You are already following this user');
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

// Unfollow user route
router.post('/:id/unfollow', authenticateToken, async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        if (!userToUnfollow) return res.status(404).json('User not found');

        const currentUser = await User.findById(req.user._id);
        if (currentUser.following.includes(userToUnfollow._id)) {
            currentUser.following = currentUser.following.filter(
                id => id.toString() !== userToUnfollow._id.toString()
            );
            userToUnfollow.followers = userToUnfollow.followers.filter(
                id => id.toString() !== currentUser._id.toString()
            );
            await currentUser.save();
            await userToUnfollow.save();
            res.json('User unfollowed successfully');
        } else {
            res.status(400).json('You are not following this user');
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// Fetch all users except the current user
router.get('/explore', authenticateToken, async (req, res) => {
    try {
      const users = await User.find({ _id: { $ne: req.user._id } });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  

export default router;
