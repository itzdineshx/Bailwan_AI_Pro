const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: String,
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number, // in minutes
  }],
  duration: Number, // total duration in minutes
  caloriesBurned: Number,
  date: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
});

const workoutPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    duration: Number,
  }],
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  category: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for global library
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Workout: mongoose.model('Workout', workoutSchema),
  WorkoutPlan: mongoose.model('WorkoutPlan', workoutPlanSchema),
};