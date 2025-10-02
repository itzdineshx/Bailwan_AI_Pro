const { Product, CartItem, Order } = require('../models/Shop');

// @desc    Get all products
// @route   GET /shop/products
// @access  Private
exports.getProducts = async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    let query = { isActive: true };
    if (category) query.category = category;

    const products = await Product.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get product by ID
// @route   GET /shop/products/:id
// @access  Private
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get user's cart
// @route   GET /shop/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user.id })
      .populate('product');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add item to cart
// @route   POST /shop/cart/add
// @access  Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cartItem = await CartItem.findOne({ user: req.user.id, product: productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({
        user: req.user.id,
        product: productId,
        quantity,
      });
    }

    await cartItem.save();
    await cartItem.populate('product');
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update cart item
// @route   PUT /shop/cart/update/:id
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { quantity },
      { new: true }
    ).populate('product');

    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /shop/cart/remove/:id
// @access  Private
exports.removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Checkout
// @route   POST /shop/checkout
// @access  Private
exports.checkout = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    const cartItems = await CartItem.find({ user: req.user.id }).populate('product');
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = cartItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Mock payment processing
    const paymentSuccess = Math.random() > 0.1; // 90% success rate for demo

    if (!paymentSuccess) {
      return res.status(400).json({ message: 'Payment failed' });
    }

    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: 'paid',
    });

    await order.save();

    // Clear cart
    await CartItem.deleteMany({ user: req.user.id });

    res.status(201).json({ order, message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get user's orders
// @route   GET /shop/orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get order by ID
// @route   GET /shop/orders/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate('items.product');

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};