const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://vickyy:nandhu000@cluster0.xq2msem.mongodb.net/tasktracker?appName=Cluster0'
)
.then(() => console.log('☑️ Connected to MongoDB!'))
.catch(err => console.error('❌ Database error:', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String
}));

const Task = mongoose.model('Task', new mongoose.Schema({
    subject: String,
    taskDetails: String,
    deadline: String,
}));

app.post('/register', async (req, res) => {
    try {
        
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'User created!'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username, password });
        if (foundUser) res.status(200).json({ message: "Login successful"});
            else res.status(401).json({ message: "Wrong username or password" });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
        });

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
