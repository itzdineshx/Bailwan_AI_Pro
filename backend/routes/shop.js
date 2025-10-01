const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  checkout,
  getOrders,
  getOrder,
} = require('../controllers/shopController');
const { auth } = require('../middleware/auth');

/**
 * @swagger
 * /shop/products:
 *   get:
 *     summary: Get all products
 *     tags: [Shop]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
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
 *         description: Products retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/products', auth, getProducts);

/**
 * @swagger
 * /shop/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Shop]
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
 *         description: Product retrieved
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
router.get('/products/:id', auth, getProduct);

/**
 * @swagger
 * /shop/cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Shop]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/cart', auth, getCart);

/**
 * @swagger
 * /shop/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Shop]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       201:
 *         description: Item added to cart
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
router.post('/cart/add', auth, addToCart);

/**
 * @swagger
 * /shop/cart/update/{id}:
 *   put:
 *     summary: Update cart item
 *     tags: [Shop]
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
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated
 *       404:
 *         description: Cart item not found
 *       401:
 *         description: Unauthorized
 */
router.put('/cart/update/:id', auth, updateCartItem);

/**
 * @swagger
 * /shop/cart/remove/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Shop]
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
 *         description: Item removed from cart
 *       404:
 *         description: Cart item not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/cart/remove/:id', auth, removeFromCart);

/**
 * @swagger
 * /shop/checkout:
 *   post:
 *     summary: Checkout cart
 *     tags: [Shop]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Cart is empty or payment failed
 *       401:
 *         description: Unauthorized
 */
router.post('/checkout', auth, checkout);

/**
 * @swagger
 * /shop/orders:
 *   get:
 *     summary: Get user's orders
 *     tags: [Shop]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved
 *       401:
 *         description: Unauthorized
 */
router.get('/orders', auth, getOrders);

/**
 * @swagger
 * /shop/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Shop]
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
 *         description: Order retrieved
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */
router.get('/orders/:id', auth, getOrder);

module.exports = router;