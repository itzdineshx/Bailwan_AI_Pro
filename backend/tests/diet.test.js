const request = require('supertest');
const app = require('../test-app');
const User = require('../models/User');
const { Meal } = require('../models/Meal');

describe('Diet Management', () => {
  let token;
  let userId;

  beforeEach(async () => {
    // Create a test user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    userId = user._id;

    // Login to get token
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    token = loginResponse.body.token;
  });

  describe('POST /diet/log', () => {
    it('should create a new meal', async () => {
      const mealData = {
        name: 'Grilled Chicken Salad',
        type: 'lunch',
        foods: [
          {
            name: 'Chicken breast',
            quantity: 150,
            unit: 'g',
            calories: 200,
            protein: 35,
            carbs: 0,
            fat: 5
          },
          {
            name: 'Mixed greens',
            quantity: 100,
            unit: 'g',
            calories: 25,
            protein: 2,
            carbs: 5,
            fat: 0
          }
        ]
      };

      const response = await request(app)
        .post('/diet/log')
        .set('Authorization', `Bearer ${token}`)
        .send(mealData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(mealData.name);
      expect(response.body.type).toBe(mealData.type);
      expect(response.body.user).toBe(userId.toString());
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/diet/log')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Incomplete Meal' })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('GET /diet/logs', () => {
    beforeEach(async () => {
      // Create test meals
      await Meal.create([
        {
          user: userId,
          name: 'Breakfast Smoothie',
          type: 'breakfast',
          foods: [
            { name: 'Banana', quantity: 1, unit: 'medium', calories: 105 }
          ]
        },
        {
          user: userId,
          name: 'Chicken Dinner',
          type: 'dinner',
          foods: [
            { name: 'Chicken breast', quantity: 150, unit: 'g', calories: 200 }
          ]
        }
      ]);
    });

    it('should get all meals for user', async () => {
      const response = await request(app)
        .get('/diet/logs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('_id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('type');
    });
  });

  describe('GET /diet/analytics', () => {
    beforeEach(async () => {
      // Create meals for today
      const today = new Date();
      await Meal.create([
        {
          user: userId,
          name: 'Breakfast',
          type: 'breakfast',
          foods: [
            { name: 'Oatmeal', quantity: 50, unit: 'g', calories: 150, protein: 5, carbs: 25, fat: 3 }
          ],
          date: today
        },
        {
          user: userId,
          name: 'Lunch',
          type: 'lunch',
          foods: [
            { name: 'Chicken breast', quantity: 150, unit: 'g', calories: 200, protein: 35, carbs: 0, fat: 5 }
          ],
          date: today
        }
      ]);
    });

    it('should get nutrition analytics', async () => {
      const response = await request(app)
        .get('/diet/analytics')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('totals');
      expect(response.body).toHaveProperty('averageDaily');
      expect(response.body).toHaveProperty('mealsCount');
      expect(typeof response.body.mealsCount).toBe('number');
    });
  });
});