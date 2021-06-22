const router = require('express').Router();

const taskRoutes = require('./task-routes.js');
const statusRoutes = require('./status-routes.js');

router.use('/tasks', taskRoutes);
router.use('/status', statusRoutes);

module.exports = router;