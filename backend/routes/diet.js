const express = require('express');
const router = express.Router();
const {
  generateMealPlan,
  logMeal,
  getMealLogs,
  getGroceryList,
  addToGroceryList,
  updateGroceryItem,
  deleteGroceryItem,
  getNutritionAnalytics,
} = require('../controllers/dietController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /diet/plan:
 *   post:
 *     summary: Generate meal plan
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               goals:
 *                 type: array
 *                 items:
 *                   type: string
 *               duration:
 *                 type: integer
 *                 default: 7
 *     responses:
 *       201:
 *         description: Meal plan generated
 *       401:
 *         description: Unauthorized
 */
router.post('/plan', auth, generateMealPlan);

/**
 * @swagger
 * /diet/log:
 *   post:
 *     summary: Log food intake
 *     tags: [Diet]
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
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [breakfast, lunch, dinner, snack]
 *               foods:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Meal logged
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/log', auth, logMeal);

/**
 * @swagger
 * /diet/logs:
 *   get:
 *     summary: Get meal history
 *     tags: [Diet]
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
 *         description: Meal logs retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/logs', auth, getMealLogs);

/**
 * @swagger
 * /diet/grocery-list:
 *   get:
 *     summary: Get grocery list
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Grocery list retrieved
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Add to grocery list
 *     tags: [Diet]
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
 *               quantity:
 *                 type: number
 *               unit:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item added to grocery list
 *       401:
 *         description: Unauthorized
 */
router.route('/grocery-list')
  .get(auth, getGroceryList)
  .post(auth, addToGroceryList);

/**
 * @swagger
 * /diet/grocery-list/{id}:
 *   put:
 *     summary: Update grocery item
 *     tags: [Diet]
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
 *         description: Grocery item updated
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete grocery item
 *     tags: [Diet]
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
 *         description: Grocery item deleted
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 */
router.route('/grocery-list/:id')
  .put(auth, updateGroceryItem)
  .delete(auth, deleteGroceryItem);

/**
 * @swagger
 * /diet/analytics:
 *   get:
 *     summary: Get nutrition analytics
 *     tags: [Diet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           default: '30'
 *     responses:
 *       200:
 *         description: Nutrition analytics retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/analytics', auth, getNutritionAnalytics);

module.exports = router;