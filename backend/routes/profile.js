const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getGoals,
  updateGoals,
  getNotifications,
  updateNotifications,
  getSubscription,
  updateSubscription,
} = require('../controllers/profileController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
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
 *         description: Profile retrieved
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
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
 *     responses:
 *       200:
 *         description: Profile updated
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
  .get(auth, getProfile)
  .put(auth, updateProfile);

/**
 * @swagger
 * /profile/goals:
 *   get:
 *     summary: Get user goals
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Goals retrieved
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update user goals
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - goals
 *             properties:
 *               goals:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Goals updated
 *       401:
 *         description: Unauthorized
 */
router.route('/goals')
  .get(auth, getGoals)
  .put(auth, updateGoals);

/**
 * @swagger
 * /profile/notifications:
 *   get:
 *     summary: Get notification settings
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification settings retrieved
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update notification settings
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: boolean
 *               push:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Notification settings updated
 *       401:
 *         description: Unauthorized
 */
router.route('/notifications')
  .get(auth, getNotifications)
  .put(auth, updateNotifications);

/**
 * @swagger
 * /profile/subscription:
 *   get:
 *     summary: Get subscription info
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription info retrieved
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update subscription
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscription
 *             properties:
 *               subscription:
 *                 type: string
 *                 enum: [free, premium]
 *     responses:
 *       200:
 *         description: Subscription updated
 *       401:
 *         description: Unauthorized
 */
router.route('/subscription')
  .get(auth, getSubscription)
  .put(auth, updateSubscription);

module.exports = router;