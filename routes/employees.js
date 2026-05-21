const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// When someone sends a POST request to this route, run the createEmployee function
router.post('/', employeeController.createEmployee);

// GET /employees (NEW LINE)
router.get('/', employeeController.getEmployees);

module.exports = router;