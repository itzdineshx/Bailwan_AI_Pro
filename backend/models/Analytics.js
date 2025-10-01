const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const bmiLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bmi: { type: Number, required: true },
  height: Number,
  weight: Number,
  date: { type: Date, default: Date.now },
});

const workoutLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
  duration: Number,
  caloriesBurned: Number,
  date: { type: Date, default: Date.now },
});

const dietLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meal: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
  date: { type: Date, default: Date.now },
});

const streakSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['workout', 'diet', 'weight'], required: true },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActivity: Date,
});

const moodLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, enum: ['happy', 'sad', 'neutral', 'excited', 'tired'], required: true },
  note: String,
  date: { type: Date, default: Date.now },
});

module.exports = {
  WeightLog: mongoose.model('WeightLog', weightLogSchema),
  BmiLog: mongoose.model('BmiLog', bmiLogSchema),
  WorkoutLog: mongoose.model('WorkoutLog', workoutLogSchema),
  DietLog: mongoose.model('DietLog', dietLogSchema),
  Streak: mongoose.model('Streak', streakSchema),
  MoodLog: mongoose.model('MoodLog', moodLogSchema),
};