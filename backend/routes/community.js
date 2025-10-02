const express = require('express');
const router = express.Router();
const {
  getFeed,
  createPost,
  getPost,
  likePost,
  commentOnPost,
  getChallenges,
  joinChallenge,
  getLeaderboard,
  followUser,
  getFollowers,
} = require('../controllers/communityController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /community/feed:
 *   get:
 *     summary: Get community feed
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Feed retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/feed', auth, getFeed);

/**
 * @swagger
 * /community/post:
 *   post:
 *     summary: Create new post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/post', auth, createPost);

/**
 * @swagger
 * /community/post/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.get('/post/:id', auth, getPost);

/**
 * @swagger
 * /community/post/{id}/like:
 *   post:
 *     summary: Like/unlike post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post liked/unliked
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.post('/post/:id/like', auth, likePost);

/**
 * @swagger
 * /community/post/{id}/comment:
 *   post:
 *     summary: Add comment to post
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 *       400:
 *         description: Bad request
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */
router.post('/post/:id/comment', auth, commentOnPost);

/**
 * @swagger
 * /community/challenges:
 *   get:
 *     summary: Get challenges
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Challenges retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/challenges', auth, getChallenges);

/**
 * @swagger
 * /community/challenges/{id}/join:
 *   post:
 *     summary: Join challenge
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joined challenge
 *       400:
 *         description: Already joined
 *       404:
 *         description: Challenge not found
 *       401:
 *         description: Unauthorized
 */
router.post('/challenges/:id/join', auth, joinChallenge);

/**
 * @swagger
 * /community/leaderboard/{id}:
 *   get:
 *     summary: Get challenge leaderboard
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Leaderboard retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/leaderboard/:id', auth, getLeaderboard);

/**
 * @swagger
 * /community/follow/{id}:
 *   post:
 *     summary: Follow/unfollow user
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Follow status updated
 *       400:
 *         description: Cannot follow yourself
 *       401:
 *         description: Unauthorized
 */
router.post('/follow/:id', auth, followUser);

/**
 * @swagger
 * /community/followers/{id}:
 *   get:
 *     summary: Get user's followers
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Followers retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/followers/:id', auth, getFollowers);

module.exports = router;