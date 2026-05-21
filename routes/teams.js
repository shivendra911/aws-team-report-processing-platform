const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.post('/', teamController.createTeam);
router.get('/', teamController.getTeams);

// NEW: The Junction Table Route
router.post('/:teamId/employees/:employeeId', teamController.assignEmployeeToTeam);

// NEW: Get all employees for a specific team
router.get('/:teamId/employees', teamController.getEmployeesInTeam);

module.exports = router;