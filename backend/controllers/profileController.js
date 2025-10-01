const User = require('../models/User');

// @desc    Get user profile
// @route   GET /profile/:id
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update user profile
// @route   PUT /profile/:id
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    // Users can only update their own profile
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get user goals
// @route   GET /profile/goals
// @access  Private
exports.getGoals = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('profile.goals');
    res.json({ goals: user.profile.goals || [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update user goals
// @route   PUT /profile/goals
// @access  Private
exports.updateGoals = async (req, res) => {
  try {
    const { goals } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 'profile.goals': goals },
      { new: true }
    ).select('profile.goals');
    res.json({ goals: user.profile.goals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get notification settings
// @route   GET /profile/notifications
// @access  Private
exports.getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('notifications');
    res.json(user.notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update notification settings
// @route   PUT /profile/notifications
// @access  Private
exports.updateNotifications = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { notifications: updates },
      { new: true }
    ).select('notifications');
    res.json(user.notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get subscription info
// @route   GET /profile/subscription
// @access  Private
exports.getSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('profile.subscription');
    res.json({ subscription: user.profile.subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update subscription
// @route   PUT /profile/subscription
// @access  Private
exports.updateSubscription = async (req, res) => {
  try {
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 'profile.subscription': subscription },
      { new: true }
    ).select('profile.subscription');
    res.json({ subscription: user.profile.subscription });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};