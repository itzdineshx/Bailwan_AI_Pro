const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  foods: [{
    name: String,
    quantity: Number,
    unit: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  }],
  totalCalories: Number,
  totalProtein: Number,
  totalCarbs: Number,
  totalFat: Number,
  date: { type: Date, default: Date.now },
});

const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  meals: [mealSchema],
  duration: Number, // in days
  goals: [String],
  createdAt: { type: Date, default: Date.now },
});

const groceryItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  quantity: Number,
  unit: String,
  isPurchased: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = {
  Meal: mongoose.model('Meal', mealSchema),
  MealPlan: mongoose.model('MealPlan', mealPlanSchema),
  GroceryItem: mongoose.model('GroceryItem', groceryItemSchema),
};