const User = require('../../models/User');

describe('User Model', () => {
  describe('User creation', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = new User(userData);
      await user.save();

      expect(user.username).toBe(userData.username);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // Should be hashed
      expect(user.role).toBe('user'); // Default role
    });

    it('should not create a user with duplicate email', async () => {
      const userData1 = {
        username: 'testuser1',
        email: 'test@example.com',
        password: 'password123',
      };

      const userData2 = {
        username: 'testuser2',
        email: 'test@example.com',
        password: 'password456',
      };

      await new User(userData1).save();

      await expect(new User(userData2).save()).rejects.toThrow();
    });

    it('should not create a user with duplicate username', async () => {
      const userData1 = {
        username: 'testuser',
        email: 'test1@example.com',
        password: 'password123',
      };

      const userData2 = {
        username: 'testuser',
        email: 'test2@example.com',
        password: 'password456',
      };

      await new User(userData1).save();

      await expect(new User(userData2).save()).rejects.toThrow();
    });
  });

  describe('Password methods', () => {
    it('should hash password before saving', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      await user.save();

      expect(user.password).not.toBe('password123');
      expect(user.password.length).toBeGreaterThan(10); // Hashed password should be longer
    });

    it('should compare password correctly', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      await user.save();

      const isValidPassword = await user.comparePassword('password123');
      const isInvalidPassword = await user.comparePassword('wrongpassword');

      expect(isValidPassword).toBe(true);
      expect(isInvalidPassword).toBe(false);
    });
  });

  describe('Token generation', () => {
    it('should create email verification token', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      const token = user.createEmailVerificationToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBe(64); // 32 bytes * 2 hex chars
      expect(user.emailVerificationToken).toBeDefined();
      expect(user.emailVerificationExpires).toBeDefined();
      expect(user.emailVerificationExpires.getTime()).toBeGreaterThan(Date.now());
    });

    it('should create password reset token', async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      const token = user.createPasswordResetToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBe(64); // 32 bytes * 2 hex chars
      expect(user.passwordResetToken).toBeDefined();
      expect(user.passwordResetExpires).toBeDefined();
      expect(user.passwordResetExpires.getTime()).toBeGreaterThan(Date.now());
    });
  });
});