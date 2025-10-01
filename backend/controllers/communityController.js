const { Post, Challenge, Follow } = require('../models/Community');
const Joi = require('joi');

// Validation schemas
const postSchema = Joi.object({
  content: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
});

// @desc    Get community feed
// @route   GET /community/feed
// @access  Private
exports.getFeed = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const posts = await Post.find()
      .populate('user', 'username profile.firstName profile.lastName')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new post
// @route   POST /community/post
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const post = new Post({ ...req.body, user: req.user.id });
    await post.save();
    await post.populate('user', 'username profile.firstName profile.lastName');
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get post by ID
// @route   GET /community/post/:id
// @access  Private
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username profile.firstName profile.lastName')
      .populate('comments.user', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Like/unlike post
// @route   POST /community/post/:id/like
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const userId = req.user.id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes.length, liked: likeIndex === -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add comment to post
// @route   POST /community/post/:id/comment
// @access  Private
exports.commentOnPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Comment content is required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      user: req.user.id,
      content,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();
    await post.populate('comments.user', 'username');

    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get challenges
// @route   GET /community/challenges
// @access  Private
exports.getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().populate('createdBy', 'username');
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Join challenge
// @route   POST /community/challenges/:id/join
// @access  Private
exports.joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

    if (challenge.participants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already joined this challenge' });
    }

    challenge.participants.push(req.user.id);
    await challenge.save();
    res.json({ message: 'Joined challenge successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get challenge leaderboard
// @route   GET /community/leaderboard/:id
// @access  Private
exports.getLeaderboard = async (req, res) => {
  try {
    // Dummy leaderboard - in real app, calculate based on challenge rules
    const leaderboard = [
      { user: 'user1', username: 'JohnDoe', score: 150 },
      { user: 'user2', username: 'JaneSmith', score: 120 },
      { user: 'user3', username: 'BobWilson', score: 100 },
    ];
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Follow user
// @route   POST /community/follow/:id
// @access  Private
exports.followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    if (targetUserId === req.user.id) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const existingFollow = await Follow.findOne({
      follower: req.user.id,
      following: targetUserId,
    });

    if (existingFollow) {
      await Follow.findByIdAndDelete(existingFollow._id);
      res.json({ message: 'Unfollowed user' });
    } else {
      const follow = new Follow({
        follower: req.user.id,
        following: targetUserId,
      });
      await follow.save();
      res.json({ message: 'Followed user' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get followers
// @route   GET /community/followers/:id
// @access  Private
exports.getFollowers = async (req, res) => {
  try {
    const follows = await Follow.find({ following: req.params.id })
      .populate('follower', 'username profile.firstName profile.lastName');
    res.json(follows.map(f => f.follower));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};