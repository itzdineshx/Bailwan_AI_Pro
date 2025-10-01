const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const workoutRoutes = require('./routes/workouts');
const dietRoutes = require('./routes/diet');
const aiRoutes = require('./routes/ai');
const communityRoutes = require('./routes/community');
const shopRoutes = require('./routes/shop');
const analyticsRoutes = require('./routes/analytics');
const profileRoutes = require('./routes/profile');
const advancedRoutes = require('./routes/advanced');
const healthRoutes = require('./routes/health');
const uploadRoutes = require('./routes/upload');

// Create Express app
const app = express();

// Trust proxy for rate limiting in development environments
app.set('trust proxy', 1);

// Middleware
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness + Diet + AI + E-commerce + Community API',
      version: '1.0.0',
      description: 'Backend API for fitness, diet, AI coaching, e-commerce, and community features',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route - redirect to API documentation
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/workouts', workoutRoutes);
app.use('/diet', dietRoutes);
app.use('/ai', aiRoutes);
app.use('/community', communityRoutes);
app.use('/shop', shopRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/profile', profileRoutes);
app.use('/advanced', advancedRoutes);
app.use('/health', healthRoutes);
app.use('/upload', uploadRoutes);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Test app error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;