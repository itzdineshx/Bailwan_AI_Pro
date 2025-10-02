const express = require('express');
const router = express.Router();
const {
  logWeight,
  getWeightLogs,
  logBMI,
  getBMILogs,
  logWorkout,
  getWorkoutLogs,
  logDiet,
  getDietLogs,
  getStreaks,
  getInsights,
} = require('../controllers/analyticsController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /analytics/weight:
 *   get:
 *     summary: Get weight logs
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weight logs retrieved
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Log weight
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - weight
 *             properties:
 *               weight:
 *                 type: number
 *     responses:
 *       201:
 *         description: Weight logged
 *       401:
 *         description: Unauthorized
 */
router.route('/weight')
  .get(auth, getWeightLogs)
  .post(auth, logWeight);

/**
 * @swagger
 * /analytics/bmi:
 *   get:
 *     summary: Get BMI logs
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: BMI logs retrieved
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Log BMI
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bmi
 *             properties:
 *               bmi:
 *                 type: number
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *     responses:
 *       201:
 *         description: BMI logged
 *       401:
 *         description: Unauthorized
 */
router.route('/bmi')
  .get(auth, getBMILogs)
  .post(auth, logBMI);

/**
 * @swagger
 * /analytics/workout:
 *   get:
 *     summary: Get workout logs
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workout logs retrieved
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Log workout
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workout
 *             properties:
 *               workout:
 *                 type: string
 *               duration:
 *                 type: number
 *               caloriesBurned:
 *                 type: number
 *     responses:
 *       201:
 *         description: Workout logged
 *       401:
 *         description: Unauthorized
 */
router.route('/workout')
  .get(auth, getWorkoutLogs)
  .post(auth, logWorkout);

/**
 * @swagger
 * /analytics/diet:
 *   get:
 *     summary: Get diet logs
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Diet logs retrieved
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Log diet
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - meal
 *             properties:
 *               meal:
 *                 type: string
 *     responses:
 *       201:
 *         description: Diet logged
 *       401:
 *         description: Unauthorized
 */
router.route('/diet')
  .get(auth, getDietLogs)
  .post(auth, logDiet);

/**
 * @swagger
 * /analytics/streaks:
 *   get:
 *     summary: Get streaks
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Streaks retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/streaks', auth, getStreaks);

/**
 * @swagger
 * /analytics/insights:
 *   get:
 *     summary: Get AI-powered insights
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Insights retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/insights', auth, getInsights);

module.exports = router;