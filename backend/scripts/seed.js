const mongoose = require('mongoose');
const User = require('../models/User');
const { Workout, WorkoutPlan } = require('../models/Workout');
const { Meal, MealPlan, GroceryItem } = require('../models/Meal');
const { Post, Challenge } = require('../models/Community');
const { Product } = require('../models/Shop');
const { WeightLog, BmiLog } = require('../models/Analytics');
require('dotenv').config();

const sampleData = {
  users: [
    {
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        gender: 'male',
        height: 175,
        weight: 75,
        goals: ['weight_loss', 'muscle_gain'],
        subscription: 'premium',
      },
    },
    {
      username: 'janesmith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'trainer',
      profile: {
        firstName: 'Jane',
        lastName: 'Smith',
        age: 28,
        gender: 'female',
        height: 165,
        weight: 60,
        goals: ['fitness_coaching'],
        subscription: 'premium',
      },
    },
    {
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      profile: {
        firstName: 'Admin',
        lastName: 'User',
        age: 35,
        goals: ['system_administration'],
        subscription: 'premium',
      },
    },
  ],

  workoutPlans: [
    {
      name: 'Beginner Full Body Workout',
      description: 'Perfect for beginners starting their fitness journey',
      exercises: [
        { name: 'Push-ups', sets: 3, reps: 10, weight: 0, duration: 5 },
        { name: 'Squats', sets: 3, reps: 15, weight: 0, duration: 5 },
        { name: 'Plank', sets: 3, reps: 1, weight: 0, duration: 30 },
      ],
      difficulty: 'beginner',
      category: 'full_body',
      isPublic: true,
    },
    {
      name: 'Advanced Upper Body Strength',
      description: 'Intense upper body workout for experienced lifters',
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 8, weight: 80, duration: 10 },
        { name: 'Pull-ups', sets: 4, reps: 10, weight: 0, duration: 8 },
        { name: 'Shoulder Press', sets: 4, reps: 10, weight: 50, duration: 8 },
      ],
      difficulty: 'advanced',
      category: 'upper_body',
      isPublic: true,
    },
  ],

  products: [
    {
      name: 'Premium Protein Powder',
      description: 'High-quality whey protein for muscle recovery',
      price: 49.99,
      category: 'supplements',
      stock: 100,
      isActive: true,
    },
    {
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat for all your workout needs',
      price: 29.99,
      category: 'equipment',
      stock: 50,
      isActive: true,
    },
    {
      name: 'Fitness Tracker Watch',
      description: 'Advanced fitness tracking with heart rate monitor',
      price: 199.99,
      category: 'wearables',
      stock: 25,
      isActive: true,
    },
  ],

  challenges: [
    {
      name: '30-Day Fitness Challenge',
      description: 'Complete 30 days of consistent workouts',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      rules: ['Workout at least 30 minutes daily', 'Log all meals', 'Track weight weekly'],
      rewards: ['Premium subscription discount', 'Exclusive workout plans', 'Personal trainer consultation'],
    },
    {
      name: 'Healthy Eating Challenge',
      description: 'Maintain healthy eating habits for 21 days',
      startDate: new Date(),
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      rules: ['Eat 5 servings of vegetables daily', 'Limit processed foods', 'Drink 8 glasses of water'],
      rewards: ['Nutritionist consultation', 'Healthy recipe book', 'Grocery discount voucher'],
    },
  ],
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness_app');
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Workout.deleteMany({});
    await WorkoutPlan.deleteMany({});
    await Meal.deleteMany({});
    await MealPlan.deleteMany({});
    await GroceryItem.deleteMany({});
    await Post.deleteMany({});
    await Challenge.deleteMany({});
    await Product.deleteMany({});
    await WeightLog.deleteMany({});
    await BmiLog.deleteMany({});

    // Seed users
    console.log('Seeding users...');
    const createdUsers = await User.insertMany(sampleData.users);
    console.log(`Created ${createdUsers.length} users`);

    // Seed workout plans
    console.log('Seeding workout plans...');
    const createdWorkoutPlans = await WorkoutPlan.insertMany(sampleData.workoutPlans);
    console.log(`Created ${createdWorkoutPlans.length} workout plans`);

    // Seed products
    console.log('Seeding products...');
    const createdProducts = await Product.insertMany(sampleData.products);
    console.log(`Created ${createdProducts.length} products`);

    // Seed challenges
    console.log('Seeding challenges...');
    const createdChallenges = await Challenge.insertMany(sampleData.challenges);
    console.log(`Created ${createdChallenges.length} challenges`);

    // Create sample posts
    console.log('Creating sample posts...');
    const samplePosts = [
      {
        user: createdUsers[0]._id,
        content: 'Just finished an amazing workout! 💪 Feeling stronger every day!',
        likes: [createdUsers[1]._id],
        comments: [
          {
            user: createdUsers[1]._id,
            content: 'Great job! Keep it up!',
            createdAt: new Date(),
          },
        ],
      },
      {
        user: createdUsers[1]._id,
        content: 'Starting a new fitness challenge today! Who\'s joining me? 🏃‍♀️',
        likes: [createdUsers[0]._id, createdUsers[2]._id],
      },
    ];
    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`Created ${createdPosts.length} posts`);

    // Create sample weight logs
    console.log('Creating sample weight logs...');
    const weightLogs = [];
    const baseWeight = 75;
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      weightLogs.push({
        user: createdUsers[0]._id,
        weight: baseWeight - (i * 0.1), // Gradual weight loss
        date,
      });
    }
    await WeightLog.insertMany(weightLogs);
    console.log(`Created ${weightLogs.length} weight logs`);

    // Create sample meals
    console.log('Creating sample meals...');
    const sampleMeals = [
      {
        user: createdUsers[0]._id,
        name: 'Breakfast - Oatmeal Bowl',
        type: 'breakfast',
        foods: [
          { name: 'Oats', quantity: 50, unit: 'g', calories: 150, protein: 5, carbs: 25, fat: 3 },
          { name: 'Banana', quantity: 1, unit: 'medium', calories: 105, protein: 1, carbs: 27, fat: 0 },
          { name: 'Almond Milk', quantity: 200, unit: 'ml', calories: 40, protein: 1, carbs: 2, fat: 3 },
        ],
        totalCalories: 295,
        totalProtein: 7,
        totalCarbs: 54,
        totalFat: 6,
      },
      {
        user: createdUsers[0]._id,
        name: 'Lunch - Grilled Chicken Salad',
        type: 'lunch',
        foods: [
          { name: 'Chicken Breast', quantity: 150, unit: 'g', calories: 231, protein: 43, carbs: 0, fat: 5 },
          { name: 'Mixed Greens', quantity: 100, unit: 'g', calories: 15, protein: 2, carbs: 3, fat: 0 },
          { name: 'Cherry Tomatoes', quantity: 100, unit: 'g', calories: 18, protein: 1, carbs: 4, fat: 0 },
          { name: 'Olive Oil', quantity: 1, unit: 'tbsp', calories: 119, protein: 0, carbs: 0, fat: 14 },
        ],
        totalCalories: 383,
        totalProtein: 46,
        totalCarbs: 7,
        totalFat: 19,
      },
    ];
    const createdMeals = await Meal.insertMany(sampleMeals);
    console.log(`Created ${createdMeals.length} meals`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nSample login credentials:');
    console.log('User: john@example.com / password123');
    console.log('Trainer: jane@example.com / password123');
    console.log('Admin: admin@example.com / admin123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run seeding if this script is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;