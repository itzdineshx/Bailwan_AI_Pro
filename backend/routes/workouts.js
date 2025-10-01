const express = require('express');
const router = express.Router();
const {
  getWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  logWorkout,
  getWorkoutHistory,
  getWorkoutLibrary,
} = require('../controllers/workoutController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get user's workouts
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workouts retrieved
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create new workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *               duration:
 *                 type: number
 *               caloriesBurned:
 *                 type: number
 *     responses:
 *       201:
 *         description: Workout created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .get(auth, getWorkouts)
  .post(auth, createWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get workout by ID
 *     tags: [Workouts]
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
 *         description: Workout retrieved
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update workout
 *     tags: [Workouts]
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
 *         description: Workout updated
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete workout
 *     tags: [Workouts]
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
 *         description: Workout deleted
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
  .get(auth, getWorkout)
  .put(auth, updateWorkout)
  .delete(auth, deleteWorkout);

/**
 * @swagger
 * /workouts/{id}/log:
 *   post:
 *     summary: Log workout completion
 *     tags: [Workouts]
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
 *         description: Workout logged
 *       404:
 *         description: Workout not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/log', auth, logWorkout);

/**
 * @swagger
 * /workouts/history:
 *   get:
 *     summary: Get workout history
 *     tags: [Workouts]
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
 *         description: Workout history retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/history', auth, getWorkoutHistory);

/**
 * @swagger
 * /workouts/library:
 *   get:
 *     summary: Get workout library
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workout library retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/library', auth, getWorkoutLibrary);

module.exports = router;