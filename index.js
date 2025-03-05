require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db')


const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks')


// Connect to the mongodb database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/', (_, res) => {
    res.status(200).json({message: 'Server is live'})
})

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));