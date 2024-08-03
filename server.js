const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files if needed
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pillDispenser', {

});

// Define a schema and model for storing settings
const settingSchema = new mongoose.Schema({
    userId: String,
    container1: String,
    container2: String,
    container3: String,
    schedule: {
        monday: {
            morning: String,
            afternoon: String,
            noon: String
        },
        // Add other days of the week
    }
});
const Setting = mongoose.model('Setting', settingSchema);

// Save settings endpoint
app.post('/saveSettings', async (req, res) => {
    try {
        const { container1, container2, container3, schedule } = req.body;
        await Setting.updateOne(
            { userId: 'user1' },
            { container1, container2, container3, schedule },
            { upsert: true }
        );
        res.status(200).send('Settings saved');
    } catch (error) {
        res.status(500).send('Error saving settings');
    }
});

// Load settings endpoint
app.get('/loadSettings', async (req, res) => {
    try {
        const settings = await Setting.findOne({ userId: 'user1' });
        res.status(200).json(settings || {});
    } catch (error) {
        res.status(500).send('Error loading settings');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
