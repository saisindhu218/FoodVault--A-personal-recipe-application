const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://127.0.0.1:5173', 'http://127.0.0.1:8080'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Database connection with better error handling
const startServer = async () => {
  try {
    console.log('🔗 Attempting to connect to MongoDB Atlas...');
    
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    };

    await mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
    
    console.log('✅ Connected to MongoDB Atlas successfully!');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🏠 Host: ${mongoose.connection.host}`);

    // Routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/recipes', require('./routes/recipes'));

    // Basic route
    app.get('/', (req, res) => {
      res.json({ 
        message: '🍳 FoodVault API is running!',
        version: '1.0.0',
        database: 'MongoDB Atlas'
      });
    });

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        databaseName: mongoose.connection.name,
        timestamp: new Date().toISOString()
      });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error details:', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('💡 Tips:');
      console.error('1. Check if your IP is whitelisted in Atlas');
      console.error('2. Verify your database user has read/write permissions');
      console.error('3. Check your internet connection');
    }
    
    process.exit(1);
  }
};

// MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('📗 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.log('📕 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📙 Mongoose disconnected from MongoDB Atlas');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed due to app termination');
  process.exit(0);
});

startServer();