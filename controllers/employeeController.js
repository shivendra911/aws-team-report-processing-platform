const pool = require('../db');

// Function to handle creating a new employee
const createEmployee = async (req, res) => {
    try {
        // Grab the name and email that the user sends in the request body
        const { name, email } = req.body;

        // Write the raw SQL query
        // We use $1 and $2 to prevent SQL injection (good security practice!)
        const newEmployee = await pool.query(
            'INSERT INTO employees (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );

        // Send back a 201 Created status and the new employee data
        res.status(201).json(newEmployee.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error, maybe that email already exists?" });
    }
};



// NEW FUNCTION: Fetch all employees
const getEmployees = async (req, res) => {
    try {
        // A simple SELECT query to get everything
        const allEmployees = await pool.query('SELECT * FROM employees');
        
        // Send back the rows as a JSON array
        res.status(200).json(allEmployees.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Don't forget to export the new function at the bottom!
module.exports = {
    createEmployee,
    getEmployees
};