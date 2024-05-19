import express from 'express';
import Post from '../models/Post.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Create a post
router.post('/', authenticateToken, async (req, res) => {
    try {
        const post = new Post({
            user: req.user._id,
            content: req.body.content
        });
        await post.save();
        res.status(201).json({"status":'Post created successfully',"data":post});
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username').populate('likes', 'username').populate('comments.user', 'username');
       // const posts = await Post.find().populate("user",['username','email'])
        res.send(posts);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Like a post
router.post('/:postId/like', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json('Post not found');

        if (!post.likes.includes(req.user._id)) {
            post.likes.push(req.user._id);
            await post.save();
            res.json('Post liked successfully');
        } else {
            res.status(400).json('You already liked this post');
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// Add a comment to a post
router.post('/:postId/comment', authenticateToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json('Post not found');

        const comment = {
            user: req.user._id,
            content: req.body.content
        };
        post.comments.push(comment);
        await post.save();
        res.json('Comment added successfully');
    } catch (err) {
        res.status(400).json(err);
    }
});

export default router;
