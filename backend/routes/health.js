const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: System is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                 database:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     responseTime:
 *                       type: number
 *       503:
 *         description: System is unhealthy
 */
router.get('/', async (req, res) => {
  const startTime = Date.now();

  try {
    // Check database connection
    const dbStatus = await checkDatabaseHealth();
    const dbResponseTime = Date.now() - startTime;

    const healthStatus = {
      status: dbStatus.status === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: dbStatus.status,
        responseTime: dbResponseTime,
      },
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB',
      },
    };

    const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(healthStatus);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /health/ping:
 *   get:
 *     summary: Simple ping endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Pong response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
    timestamp: new Date().toISOString(),
  });
});

async function checkDatabaseHealth() {
  try {
    // Simple database query to check connection
    await mongoose.connection.db.admin().ping();
    return { status: 'connected' };
  } catch (error) {
    return { status: 'disconnected', error: error.message };
  }
}

module.exports = router;