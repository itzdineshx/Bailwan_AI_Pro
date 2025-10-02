const {
  WeightLog,
  BmiLog,
  WorkoutLog,
  DietLog,
  Streak,
  MoodLog,
} = require('../models/Analytics');

// @desc    Log weight
// @route   POST /analytics/weight
// @access  Private
exports.logWeight = async (req, res) => {
  try {
    const { weight } = req.body;
    const weightLog = new WeightLog({ user: req.user.id, weight });
    await weightLog.save();

    // Update streak
    await updateStreak(req.user.id, 'weight');

    res.status(201).json(weightLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get weight logs
// @route   GET /analytics/weight
// @access  Private
exports.getWeightLogs = async (req, res) => {
  try {
    const logs = await WeightLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Log BMI
// @route   POST /analytics/bmi
// @access  Private
exports.logBMI = async (req, res) => {
  try {
    const { bmi, height, weight } = req.body;
    const bmiLog = new BmiLog({ user: req.user.id, bmi, height, weight });
    await bmiLog.save();
    res.status(201).json(bmiLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get BMI logs
// @route   GET /analytics/bmi
// @access  Private
exports.getBMILogs = async (req, res) => {
  try {
    const logs = await BmiLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Log workout
// @route   POST /analytics/workout
// @access  Private
exports.logWorkout = async (req, res) => {
  try {
    const { workout, duration, caloriesBurned } = req.body;
    const workoutLog = new WorkoutLog({
      user: req.user.id,
      workout,
      duration,
      caloriesBurned,
    });
    await workoutLog.save();

    // Update streak
    await updateStreak(req.user.id, 'workout');

    res.status(201).json(workoutLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get workout logs
// @route   GET /analytics/workout
// @access  Private
exports.getWorkoutLogs = async (req, res) => {
  try {
    const logs = await WorkoutLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Log diet
// @route   POST /analytics/diet
// @access  Private
exports.logDiet = async (req, res) => {
  try {
    const { meal } = req.body;
    const dietLog = new DietLog({ user: req.user.id, meal });
    await dietLog.save();

    // Update streak
    await updateStreak(req.user.id, 'diet');

    res.status(201).json(dietLog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get diet logs
// @route   GET /analytics/diet
// @access  Private
exports.getDietLogs = async (req, res) => {
  try {
    const logs = await DietLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get streaks
// @route   GET /analytics/streaks
// @access  Private
exports.getStreaks = async (req, res) => {
  try {
    const streaks = await Streak.find({ user: req.user.id });
    res.json(streaks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get AI-powered insights
// @route   GET /analytics/insights
// @access  Private
exports.getInsights = async (req, res) => {
  try {
    // Dummy insights - in real app, use ML to analyze data
    const insights = {
      weight: {
        trend: 'decreasing',
        averageLossPerWeek: 0.5,
        recommendation: 'Keep up the good work!',
      },
      workout: {
        consistency: 85,
        mostFrequent: 'Cardio',
        recommendation: 'Try adding strength training.',
      },
      diet: {
        calorieIntake: 2100,
        proteinRatio: 25,
        recommendation: 'Increase vegetable intake.',
      },
    };

    res.json(insights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Helper function to update streaks
const updateStreak = async (userId, type) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = await Streak.findOne({ user: userId, type });
  if (!streak) {
    streak = new Streak({ user: userId, type, currentStreak: 1, lastActivity: today });
  } else {
    const lastActivity = new Date(streak.lastActivity);
    lastActivity.setHours(0, 0, 0, 0);

    const diffTime = today - lastActivity;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak.currentStreak += 1;
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }
    } else if (diffDays > 1) {
      streak.currentStreak = 1;
    }
    streak.lastActivity = today;
  }

  await streak.save();
};