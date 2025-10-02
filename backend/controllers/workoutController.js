const { Workout, WorkoutPlan } = require('../models/Workout');
const Joi = require('joi');

// Validation schemas
const workoutSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  exercises: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      sets: Joi.number().integer().min(1),
      reps: Joi.number().integer().min(1),
      weight: Joi.number().min(0),
      duration: Joi.number().min(0),
    })
  ),
  duration: Joi.number().min(0),
  caloriesBurned: Joi.number().min(0),
});

// @desc    Get user's workouts
// @route   GET /workouts
// @access  Private
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new workout
// @route   POST /workouts
// @access  Private
exports.createWorkout = async (req, res) => {
  try {
    const { error } = workoutSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const workout = new Workout({ ...req.body, user: req.user.id });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get workout by ID
// @route   GET /workouts/:id
// @access  Private
exports.getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, user: req.user.id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update workout
// @route   PUT /workouts/:id
// @access  Private
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete workout
// @route   DELETE /workouts/:id
// @access  Private
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Log workout completion
// @route   POST /workouts/:id/log
// @access  Private
exports.logWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isCompleted: true, ...req.body },
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get workout history
// @route   GET /workouts/history
// @access  Private
exports.getWorkoutHistory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const workouts = await Workout.find({ user: req.user.id, isCompleted: true })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get workout library
// @route   GET /workouts/library
// @access  Private
exports.getWorkoutLibrary = async (req, res) => {
  try {
    const library = await WorkoutPlan.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(library);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};