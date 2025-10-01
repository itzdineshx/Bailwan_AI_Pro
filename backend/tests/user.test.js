const User = require('../models/User');

describe('User Model', () => {
  describe('User creation', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const user = new User(userData);
      await user.save();

      expect(user.username).toBe(userData.username);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // Should be hashed
      expect(user.role).toBe('user'); // Default role
      expect(user.isEmailVerified).toBe(false); // Default value
    });

    it('should require username, email, and password', async () => {
      const user = new User({});
      let error;

      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.username).toBeDefined();
      expect(error.errors.email).toBeDefined();
      expect(error.errors.password).toBeDefined();
    });

    it('should enforce unique username and email', async () => {
      // Create first user
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      // Try to create duplicate
      let error;
      try {
        await User.create({
          username: 'testuser',
          email: 'different@example.com',
          password: 'password123'
        });
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.code).toBe(11000); // MongoDB duplicate key error
    });
  });

  describe('Password hashing', () => {
    it('should hash password before saving', async () => {
      const password = 'password123';
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password
      });

      await user.save();

      expect(user.password).not.toBe(password);
      expect(user.password.length).toBeGreaterThan(password.length);
    });

    it('should compare passwords correctly', async () => {
      const password = 'password123';
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password
      });

      await user.save();

      const isValidPassword = await user.comparePassword(password);
      const isInvalidPassword = await user.comparePassword('wrongpassword');

      expect(isValidPassword).toBe(true);
      expect(isInvalidPassword).toBe(false);
    });
  });

  describe('Email verification tokens', () => {
    it('should create email verification token', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      const token = user.createEmailVerificationToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBe(64); // 32 bytes * 2 for hex
      expect(user.emailVerificationToken).toBeDefined();
      expect(user.emailVerificationExpires).toBeDefined();
      expect(user.emailVerificationExpires).toBeInstanceOf(Date);
    });

    it('should create password reset token', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      const token = user.createPasswordResetToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBe(64); // 32 bytes * 2 for hex
      expect(user.passwordResetToken).toBeDefined();
      expect(user.passwordResetExpires).toBeDefined();
      expect(user.passwordResetExpires).toBeInstanceOf(Date);
    });
  });

  describe('User profile', () => {
    it('should have default profile values', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      await user.save();

      expect(user.profile.subscription).toBe('free');
      expect(user.notifications.email).toBe(true);
      expect(user.notifications.push).toBe(true);
    });

    it('should allow profile updates', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

      await user.save();

      user.profile.firstName = 'John';
      user.profile.lastName = 'Doe';
      user.profile.age = 30;
      user.profile.height = 175;
      user.profile.weight = 70;

      await user.save();

      const updatedUser = await User.findById(user._id);

      expect(updatedUser.profile.firstName).toBe('John');
      expect(updatedUser.profile.lastName).toBe('Doe');
      expect(updatedUser.profile.age).toBe(30);
      expect(updatedUser.profile.height).toBe(175);
      expect(updatedUser.profile.weight).toBe(70);
    });
  });
});