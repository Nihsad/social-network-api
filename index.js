const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes.js');
const thoughtRoutes = require('./routes/thoughtRoutes.js');
const reactionRoutes = require('./routes/reactionRoutes.js');
const friendRoutes = require('./routes/friendRoutes.js');
const PORT = process.env.PORT || 3000;

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/friends', friendRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/social_network_db';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));