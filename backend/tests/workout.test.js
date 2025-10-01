const request = require('supertest');
const app = require('../test-app');
const User = require('../models/User');
const { Workout } = require('../models/Workout');

describe('Workout Management', () => {
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

  describe('POST /workouts', () => {
    it('should create a new workout', async () => {
      const workoutData = {
        name: 'Morning Cardio',
        description: 'High intensity cardio workout',
        duration: 30,
        exercises: [
          {
            name: 'Running',
            sets: 1,
            reps: 1,
            duration: 30
          }
        ]
      };

      const response = await request(app)
        .post('/workouts')
        .set('Authorization', `Bearer ${token}`)
        .send(workoutData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(workoutData.name);
      expect(response.body.user).toBe(userId.toString());
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/workouts')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('GET /workouts', () => {
    beforeEach(async () => {
      // Create test workouts
      await Workout.create([
        {
          user: userId,
          name: 'Workout 1',
          description: 'Strength training workout',
          duration: 45,
          exercises: [
            { name: 'Push-ups', sets: 3, reps: 10 },
            { name: 'Squats', sets: 3, reps: 15 }
          ]
        },
        {
          user: userId,
          name: 'Workout 2',
          description: 'Cardio workout',
          duration: 30,
          exercises: [
            { name: 'Running', sets: 1, duration: 30 }
          ]
        }
      ]);
    });

    it('should get all workouts for user', async () => {
      const response = await request(app)
        .get('/workouts')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('_id');
      expect(response.body[0]).toHaveProperty('name');
    });
  });

  describe('GET /workouts/:id', () => {
    let workoutId;

    beforeEach(async () => {
      const workout = await Workout.create({
        user: userId,
        name: 'Test Workout',
        description: 'A test workout',
        duration: 45,
        exercises: [
          { name: 'Bench Press', sets: 3, reps: 10, weight: 80 }
        ]
      });
      workoutId = workout._id;
    });

    it('should get workout by id', async () => {
      const response = await request(app)
        .get(`/workouts/${workoutId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body._id).toBe(workoutId.toString());
      expect(response.body.name).toBe('Test Workout');
    });

    it('should return 404 for non-existent workout', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/workouts/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body.message).toBe('Workout not found');
    });
  });

  describe('PUT /workouts/:id', () => {
    let workoutId;

    beforeEach(async () => {
      const workout = await Workout.create({
        user: userId,
        name: 'Original Workout',
        description: 'Original workout description',
        duration: 45,
        exercises: [
          { name: 'Deadlift', sets: 3, reps: 8, weight: 100 }
        ]
      });
      workoutId = workout._id;
    });

    it('should update workout', async () => {
      const updateData = {
        name: 'Updated Workout',
        duration: 60
      };

      const response = await request(app)
        .put(`/workouts/${workoutId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).toBe('Updated Workout');
      expect(response.body.duration).toBe(60);
    });

    it('should not update workout created by another user', async () => {
      // Create another user
      const otherUser = await User.create({
        username: 'otheruser',
        email: 'other@example.com',
        password: 'password123'
      });

      // Create workout for other user
      const otherWorkout = await Workout.create({
        user: otherUser._id,
        name: 'Other Workout',
        description: 'Cardio workout for another user',
        duration: 30,
        exercises: [
          { name: 'Jumping Jacks', sets: 3, reps: 20 }
        ]
      });

      const response = await request(app)
        .put(`/workouts/${otherWorkout._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Hacked Workout' })
        .expect(404);

      expect(response.body.message).toBe('Workout not found');
    });
  });

  describe('DELETE /workouts/:id', () => {
    let workoutId;

    beforeEach(async () => {
      const workout = await Workout.create({
        user: userId,
        name: 'Workout to Delete',
        description: 'This workout will be deleted',
        duration: 45,
        exercises: [
          { name: 'Pull-ups', sets: 3, reps: 8 }
        ]
      });
      workoutId = workout._id;
    });

    it('should delete workout', async () => {
      const response = await request(app)
        .delete(`/workouts/${workoutId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.message).toBe('Workout deleted');

      // Verify workout is deleted
      const deletedWorkout = await Workout.findById(workoutId);
      expect(deletedWorkout).toBeNull();
    });
  });
});