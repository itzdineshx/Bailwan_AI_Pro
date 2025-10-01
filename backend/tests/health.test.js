const request = require('supertest');
const app = require('../test-app');

describe('Health Check', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('database');
      expect(response.body).toHaveProperty('memory');
    });

    it('should return healthy status when database is connected', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      // Since we're using in-memory database in tests, it should be healthy
      expect(response.body.status).toBe('healthy');
      expect(response.body.database.status).toBe('connected');
    });
  });

  describe('GET /health/ping', () => {
    it('should return pong', async () => {
      const response = await request(app)
        .get('/health/ping')
        .expect(200);

      expect(response.body.message).toBe('pong');
    });
  });
});