const { Workout } = require('../models/Workout');
const { Meal } = require('../models/Meal');
const { WeightLog, BmiLog, WorkoutLog, DietLog, Streak } = require('../models/Analytics');

// @desc    Get dashboard summary
// @route   GET /dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today's workouts
    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: today, $lt: tomorrow },
    });

    // Today's meals
    const todaysMeals = await Meal.find({
      user: userId,
      date: { $gte: today, $lt: tomorrow },
    });

    // Recent weight
    const recentWeight = await WeightLog.findOne({ user: userId }).sort({ date: -1 });

    // Streaks
    const workoutStreak = await Streak.findOne({ user: userId, type: 'workout' });
    const dietStreak = await Streak.findOne({ user: userId, type: 'diet' });

    const summary = {
      todaysWorkouts: todaysWorkouts.length,
      todaysMeals: todaysMeals.length,
      recentWeight: recentWeight ? recentWeight.weight : null,
      workoutStreak: workoutStreak ? workoutStreak.currentStreak : 0,
      dietStreak: dietStreak ? dietStreak.currentStreak : 0,
    };

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get progress analytics
// @route   GET /dashboard/progress
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30' } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Weight progress
    const weightLogs = await WeightLog.find({
      user: userId,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    // Workout progress
    const workoutLogs = await WorkoutLog.find({
      user: userId,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    // Diet progress
    const dietLogs = await DietLog.find({
      user: userId,
      date: { $gte: startDate },
    }).sort({ date: 1 });

    res.json({
      weightProgress: weightLogs,
      workoutProgress: workoutLogs,
      dietProgress: dietLogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get AI insights
// @route   GET /dashboard/insights
// @access  Private
exports.getInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    // Dummy AI insights - in real app, this would use ML models
    const insights = [
      {
        type: 'workout',
        message: 'You\'ve been consistent with workouts this week! Keep it up.',
        suggestion: 'Try increasing intensity for better results.',
      },
      {
        type: 'diet',
        message: 'Your protein intake has improved.',
        suggestion: 'Consider adding more vegetables to your meals.',
      },
      {
        type: 'progress',
        message: 'You\'re on track to reach your weight goal.',
        suggestion: 'Maintain current calorie deficit.',
      },
    ];

    res.json({ insights });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};