const express = require('express');
const router = express.Router();
const {
  startVirtualTrainer,
  processVoiceCommand,
  logMood,
  getMoodLogs,
  getMoodAnalytics,
  getRecoveryTips,
} = require('../controllers/advancedController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /virtual-trainer/start:
 *   post:
 *     summary: Start virtual trainer session
 *     tags: [Advanced]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Virtual trainer session started
 *       401:
 *         description: Unauthorized
 */
router.post('/virtual-trainer/start', auth, startVirtualTrainer);

/**
 * @swagger
 * /voice/command:
 *   post:
 *     summary: Process voice command
 *     tags: [Advanced]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - command
 *             properties:
 *               command:
 *                 type: string
 *     responses:
 *       200:
 *         description: Voice command processed
 *       401:
 *         description: Unauthorized
 */
router.post('/voice/command', auth, processVoiceCommand);

/**
 * @swagger
 * /mood/log:
 *   post:
 *     summary: Log mood
 *     tags: [Advanced]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mood
 *             properties:
 *               mood:
 *                 type: string
 *                 enum: [happy, sad, neutral, excited, tired]
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mood logged
 *       401:
 *         description: Unauthorized
 */
router.post('/mood/log', auth, logMood);

/**
 * @swagger
 * /mood/logs:
 *   get:
 *     summary: Get mood logs
 *     tags: [Advanced]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mood logs retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/mood/logs', auth, getMoodLogs);

/**
 * @swagger
 * /mood/analytics:
 *   get:
 *     summary: Get mood analytics
 *     tags: [Advanced]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Mood analytics retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/mood/analytics', auth, getMoodAnalytics);

/**
 * @swagger
 * /recovery/tips:
 *   get:
 *     summary: Get AI recovery tips
 *     tags: [Advanced]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recovery tips retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/recovery/tips', auth, getRecoveryTips);

module.exports = router;