const Joi = require('joi');

// Middleware for validating request bodies
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Common validation schemas
const schemas = {
  register: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'trainer', 'admin').default('user'),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  workout: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    exercises: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        sets: Joi.number().integer().min(1),
        reps: Joi.number().integer().min(1),
        weight: Joi.number().min(0),
        duration: Joi.number().min(0),
      })
    ),
    duration: Joi.number().min(0),
    caloriesBurned: Joi.number().min(0),
  }),

  meal: Joi.object({
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
  }),

  post: Joi.object({
    content: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
  }),
};

module.exports = { validate, schemas };