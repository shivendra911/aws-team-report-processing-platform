

const express = require('express');
const app = express();

app.use(express.json());

// Import our new employee routes
const employeeRoutes = require('./routes/employees');

// Tell the server to use these routes for anything starting with /employees
app.use('/employees', employeeRoutes);


// NEW: Add the Team Routes
const teamRoutes = require('./routes/teams');
app.use('/teams', teamRoutes);

app.get('/health', (req, res) => {
    res.json({ status: "Server is up and running!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});