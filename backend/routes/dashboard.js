const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getProgress,
  getInsights,
} = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, getDashboard);

/**
 * @swagger
 * /dashboard/progress:
 *   get:
 *     summary: Get progress analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *         description: Period in days (default 30)
 *     responses:
 *       200:
 *         description: Progress data retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/progress', auth, getProgress);

/**
 * @swagger
 * /dashboard/insights:
 *   get:
 *     summary: Get AI insights
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: AI insights retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/insights', auth, getInsights);

module.exports = router;