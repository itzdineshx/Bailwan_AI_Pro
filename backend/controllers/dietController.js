const { Meal, MealPlan, GroceryItem } = require('../models/Meal');
const Joi = require('joi');

// Validation schemas
const mealSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack').required(),
  foods: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      quantity: Joi.number().min(0).required(),
      unit: Joi.string().required(),
      calories: Joi.number().min(0),
      protein: Joi.number().min(0),
      carbs: Joi.number().min(0),
      fat: Joi.number().min(0),
    })
  ),
});

// @desc    Generate meal plan
// @route   POST /diet/plan
// @access  Private
exports.generateMealPlan = async (req, res) => {
  try {
    const { goals, duration = 7 } = req.body;

    // Dummy meal plan generation - in real app, use AI/ML
    const mealPlan = {
      user: req.user.id,
      name: `Meal Plan for ${goals.join(', ')}`,
      duration,
      meals: [
        {
          name: 'Breakfast - Oatmeal with Fruits',
          type: 'breakfast',
          foods: [
            { name: 'Oats', quantity: 50, unit: 'g', calories: 150, protein: 5, carbs: 25, fat: 3 },
            { name: 'Banana', quantity: 1, unit: 'medium', calories: 105, protein: 1, carbs: 27, fat: 0 },
          ],
          totalCalories: 255,
          totalProtein: 6,
          totalCarbs: 52,
          totalFat: 3,
        },
        // Add more meals...
      ],
    };

    const newMealPlan = new MealPlan(mealPlan);
    await newMealPlan.save();
    res.status(201).json(newMealPlan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Log food intake
// @route   POST /diet/log
// @access  Private
exports.logMeal = async (req, res) => {
  try {
    const { error } = mealSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const meal = new Meal({ ...req.body, user: req.user.id });
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get meal history
// @route   GET /diet/logs
// @access  Private
exports.getMealLogs = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const meals = await Meal.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get grocery list
// @route   GET /diet/grocery-list
// @access  Private
exports.getGroceryList = async (req, res) => {
  try {
    const groceryList = await GroceryItem.find({ user: req.user.id, isPurchased: false });
    res.json(groceryList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Add to grocery list
// @route   POST /diet/grocery-list
// @access  Private
exports.addToGroceryList = async (req, res) => {
  try {
    const groceryItem = new GroceryItem({ ...req.body, user: req.user.id });
    await groceryItem.save();
    res.status(201).json(groceryItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update grocery item
// @route   PUT /diet/grocery-list/:id
// @access  Private
exports.updateGroceryItem = async (req, res) => {
  try {
    const item = await GroceryItem.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Grocery item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete grocery item
// @route   DELETE /diet/grocery-list/:id
// @access  Private
exports.deleteGroceryItem = async (req, res) => {
  try {
    const item = await GroceryItem.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!item) return res.status(404).json({ message: 'Grocery item not found' });
    res.json({ message: 'Grocery item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get nutrition analytics
// @route   GET /diet/analytics
// @access  Private
exports.getNutritionAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const meals = await Meal.find({
      user: req.user.id,
      date: { $gte: startDate },
    });

    // Calculate totals
    const totals = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.totalCalories || 0;
        acc.protein += meal.totalProtein || 0;
        acc.carbs += meal.totalCarbs || 0;
        acc.fat += meal.totalFat || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const averageDaily = {
      calories: Math.round(totals.calories / parseInt(period)),
      protein: Math.round(totals.protein / parseInt(period)),
      carbs: Math.round(totals.carbs / parseInt(period)),
      fat: Math.round(totals.fat / parseInt(period)),
    };

    res.json({ totals, averageDaily, mealsCount: meals.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};