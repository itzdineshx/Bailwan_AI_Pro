# Fitness + Diet + AI + E-commerce + Community Backend API

A comprehensive backend API for a fitness application built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access (user, trainer, admin)
- **Dashboard**: Daily summary, progress analytics, AI insights
- **Workouts**: CRUD operations, exercise logging, workout library
- **Diet & Nutrition**: Meal planning, food logging, grocery lists, nutrition analytics
- **AI Coaching**: Chatbot, personalized suggestions, predictions, alerts (dummy responses)
- **Community**: Social feed, posts, likes, comments, challenges, follow system
- **E-commerce**: Product catalog, shopping cart, checkout, order management
- **Analytics & Tracking**: Weight/BMI logging, workout/diet tracking, streaks, insights
- **Profile Management**: User profiles, goals, notifications, subscriptions
- **Advanced Features**: Virtual trainer, voice commands, mood logging, recovery tips

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Documentation**: Swagger/OpenAPI
- **Testing**: Postman

## Recent Updates

- ✅ Fixed MongoDB deprecation warnings
- ✅ Resolved rate limiting proxy header issues
- ✅ Added root route redirect to API documentation
- ✅ Enhanced error handling and logging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Documentation**: Swagger/OpenAPI
- **Testing**: Postman

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance like MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - **Option 1: Local MongoDB**
     - Install MongoDB Community Server
     - Start MongoDB service: `mongod`
   - **Option 2: MongoDB Atlas (Cloud)**
     - Create account at https://www.mongodb.com/atlas
     - Create a cluster and get connection string

4. Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fitness_app
   # Or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/fitness_app
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Documentation

### Swagger Documentation

Access the interactive API documentation at:
```
http://localhost:5000/docs
```

### Postman Collection

Import the `Fitness_API_Postman_Collection.json` file into Postman for testing.

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user profile
- `PUT /auth/update-profile` - Update user profile
- `PUT /auth/update-goals` - Update user goals
- `DELETE /auth/delete` - Delete user account

### Dashboard
- `GET /dashboard` - Get dashboard summary
- `GET /dashboard/progress` - Get progress analytics
- `GET /dashboard/insights` - Get AI insights

### Workouts
- `GET /workouts` - Get user's workouts
- `POST /workouts` - Create new workout
- `GET /workouts/:id` - Get workout by ID
- `PUT /workouts/:id` - Update workout
- `DELETE /workouts/:id` - Delete workout
- `POST /workouts/:id/log` - Log workout completion
- `GET /workouts/history` - Get workout history
- `GET /workouts/library` - Get workout library

### Diet & Nutrition
- `POST /diet/plan` - Generate meal plan
- `POST /diet/log` - Log food intake
- `GET /diet/logs` - Get meal history
- `GET /diet/grocery-list` - Get grocery list
- `POST /diet/grocery-list` - Add to grocery list
- `PUT /diet/grocery-list/:id` - Update grocery item
- `DELETE /diet/grocery-list/:id` - Delete grocery item
- `GET /diet/analytics` - Get nutrition analytics

### AI Coaching
- `POST /ai/chat` - AI chatbot Q&A
- `GET /ai/suggestions` - Get personalized tips
- `GET /ai/predictions` - Get progress predictions
- `GET /ai/alerts` - Get AI alerts/reminders

### Community
- `GET /community/feed` - Get community feed
- `POST /community/post` - Create new post
- `GET /community/post/:id` - Get post by ID
- `POST /community/post/:id/like` - Like/unlike post
- `POST /community/post/:id/comment` - Add comment to post
- `GET /community/challenges` - Get challenges
- `POST /community/challenges/:id/join` - Join challenge
- `GET /community/leaderboard/:id` - Get challenge leaderboard
- `POST /community/follow/:id` - Follow/unfollow user
- `GET /community/followers/:id` - Get user's followers

### E-commerce
- `GET /shop/products` - Get all products
- `GET /shop/products/:id` - Get product by ID
- `GET /shop/cart` - Get user's cart
- `POST /shop/cart/add` - Add item to cart
- `PUT /shop/cart/update/:id` - Update cart item
- `DELETE /shop/cart/remove/:id` - Remove item from cart
- `POST /shop/checkout` - Checkout cart
- `GET /shop/orders` - Get user's orders
- `GET /shop/orders/:id` - Get order by ID

### Analytics & Tracking
- `GET /analytics/weight` - Get weight logs
- `POST /analytics/weight` - Log weight
- `GET /analytics/bmi` - Get BMI logs
- `POST /analytics/bmi` - Log BMI
- `GET /analytics/workout` - Get workout logs
- `POST /analytics/workout` - Log workout
- `GET /analytics/diet` - Get diet logs
- `POST /analytics/diet` - Log diet
- `GET /analytics/streaks` - Get streaks
- `GET /analytics/insights` - Get AI-powered insights

### Profile & Settings
- `GET /profile/:id` - Get user profile
- `PUT /profile/:id` - Update user profile
- `GET /profile/goals` - Get user goals
- `PUT /profile/goals` - Update user goals
- `GET /profile/notifications` - Get notification settings
- `PUT /profile/notifications` - Update notification settings
- `GET /profile/subscription` - Get subscription info
- `PUT /profile/subscription` - Update subscription

### Advanced Features
- `POST /advanced/virtual-trainer/start` - Start virtual trainer session
- `POST /advanced/voice/command` - Process voice command
- `POST /advanced/mood/log` - Log mood
- `GET /advanced/mood/logs` - Get mood logs
- `GET /advanced/mood/analytics` - Get mood analytics
- `GET /advanced/recovery/tips` - Get AI recovery tips

## Testing

1. Start the server: `npm run dev`
2. Open Swagger UI: `http://localhost:5000/docs`
3. Import the Postman collection and test endpoints
4. Use the following test user credentials:
   - Email: Create a new user via registration
   - Password: As set during registration

## Project Structure

```
backend/
├── controllers/          # Route controllers
├── middleware/           # Custom middleware
├── models/              # MongoDB models
├── routes/              # API routes
├── utils/               # Utility functions
├── logs/                # Application logs
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables
└── Fitness_API_Postman_Collection.json  # Postman collection
```

## Security Features

- JWT authentication with expiration
- Password hashing with bcrypt
- Rate limiting
- Input validation with Joi
- CORS protection
- Helmet security headers
- Request logging

## Deployment

1. Set up production MongoDB instance
2. Set environment variables for production
3. Build and deploy to your preferred hosting service (Heroku, AWS, etc.)
4. Set up proper logging and monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.