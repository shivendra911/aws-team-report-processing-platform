const pool = require('../db');

const createTeam = async (req, res) => {
    try {
        const { team_name } = req.body;
        const newTeam = await pool.query(
            'INSERT INTO teams (team_name) VALUES ($1) RETURNING *',
            [team_name]
        );
        res.status(201).json(newTeam.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

const getTeams = async (req, res) => {
    try {
        const allTeams = await pool.query('SELECT * FROM teams');
        res.status(200).json(allTeams.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};
const assignEmployeeToTeam = async (req, res) => {
    try {
        // Grab the IDs directly from the URL parameters
        const { teamId, employeeId } = req.params;

        // Insert them into our junction table
        const assignment = await pool.query(
            'INSERT INTO employee_teams (team_id, employee_id) VALUES ($1, $2) RETURNING *',
            [teamId, employeeId]
        );

        res.status(201).json({
            message: "Employee successfully assigned to team!",
            data: assignment.rows[0]
        });

    } catch (err) {
        console.error(err.message);
        
        // If the error code is 23505, it means this pairing already exists (Composite Key at work!)
        if (err.code === '23505') {
            return res.status(400).json({ error: "This employee is already on this team!" });
        }
        
        res.status(500).json({ error: "Server error" });
    }
};
const getEmployeesInTeam = async (req, res) => {
    try {
        const { teamId } = req.params;

        // The mandatory JOIN query!
        const query = `
            SELECT e.id, e.name, e.email 
            FROM employees e
            JOIN employee_teams et ON e.id = et.employee_id
            WHERE et.team_id = $1
        `;

        const result = await pool.query(query, [teamId]);

        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error while fetching team members" });
    }
};

// Update your exports to include the new function
module.exports = {
    createTeam,
    getTeams,
    assignEmployeeToTeam,
    getEmployeesInTeam // <-- Added here
};
