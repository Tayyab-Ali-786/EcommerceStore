const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerceStore";

console.log('--- Database Connection Diagnostic ---');
console.log('Testing connection...');

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('✅ Success: Connected to MongoDB successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Connection Failed!');
        console.error('Error Name:', err.name);
        console.error('Error Message:', err.message);

        if (err.message.includes('ETIMEDOUT') || err.message.includes('Could not connect to any servers') || err.name === 'MongooseServerSelectionError') {
            console.log('\n💡 Possible Cause: IP Whitelist or Network Block');
            console.log('Your server cannot reach MongoDB. If using MongoDB Atlas:');
            console.log('1. Go to Network Access');
            console.log('2. Add IP Address: 0.0.0.0/0 (to allow Render to connect)');
        } else if (err.message.includes('Authentication failed')) {
            console.log('\n💡 Possible Cause: Invalid Credentials');
            console.log('The username or password in your connection string is incorrect.');
        }
        process.exit(1);
    });
