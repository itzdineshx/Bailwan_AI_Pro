const express = require('express');
const router = express.Router();
const {
  chatWithAI,
  getSuggestions,
  getPredictions,
  getAlerts,
} = require('../controllers/aiController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /ai/chat:
 *   post:
 *     summary: AI chatbot Q&A
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI response received
 *       401:
 *         description: Unauthorized
 */
router.post('/chat', auth, chatWithAI);

/**
 * @swagger
 * /ai/suggestions:
 *   get:
 *     summary: Get personalized tips
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suggestions retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/suggestions', auth, getSuggestions);

/**
 * @swagger
 * /ai/predictions:
 *   get:
 *     summary: Get progress predictions
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Predictions retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/predictions', auth, getPredictions);

/**
 * @swagger
 * /ai/alerts:
 *   get:
 *     summary: Get AI alerts/reminders
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Alerts retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/alerts', auth, getAlerts);

module.exports = router;