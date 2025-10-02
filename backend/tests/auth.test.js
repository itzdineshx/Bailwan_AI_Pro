const request = require('supertest');
const app = require('../test-app');
const User = require('../models/User');

describe('Authentication', () => {
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should not register user with existing email', async () => {
      // First create a user
      await User.create({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'password123'
      });

      const response = await request(app)
        .post('/auth/register')
        .send({
          username: 'newuser',
          email: 'existing@example.com',
          password: 'password123'
        })
        .expect(400);

      expect(response.body.message).toBe('User already exists');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({})
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Create a test user
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should not login with incorrect password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })
        .expect(401);

      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('GET /auth/me', () => {
    let token;

    beforeEach(async () => {
      // Create and login user to get token
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      token = loginResponse.body.token;
    });

    it('should get current user profile', async () => {
      const response = await request(app)
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('test@example.com');
      expect(response.body.username).toBe('testuser');
    });

    it('should not get profile without token', async () => {
      const response = await request(app)
        .get('/auth/me')
        .expect(401);

      expect(response.body.message).toBe('No token provided');
    });
  });

  describe('POST /auth/forgot-password', () => {
    beforeEach(async () => {
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    it('should send password reset for existing user', async () => {
      const response = await request(app)
        .post('/auth/forgot-password')
        .send({ email: 'test@example.com' })
        .expect(200);

      expect(response.body.message).toBe('Password reset email sent successfully');
    });

    it('should not reveal if email exists', async () => {
      const response = await request(app)
        .post('/auth/forgot-password')
        .send({ email: 'nonexistent@example.com' })
        .expect(200);

      expect(response.body.message).toBe('If an account with that email exists, a password reset link has been sent.');
    });
  });
});