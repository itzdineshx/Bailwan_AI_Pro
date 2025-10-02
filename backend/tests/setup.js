const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Mock the server startup to prevent it from running during tests
jest.mock('../server', () => {
  return jest.fn();
});

let mongoServer;

// Setup before all tests
beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
}, 60000);

// Cleanup after each test
afterEach(async () => {
  // Clear all collections
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// Cleanup after all tests
afterAll(async () => {
  // Close database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  // Stop the in-memory MongoDB instance
  await mongoServer.stop();
}, 60000);