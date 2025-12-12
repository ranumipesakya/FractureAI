const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // FIX: Use process.env.MONGO_URI instead of the hardcoded address
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;