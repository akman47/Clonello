const router = require('express').Router();

const userRoutes = require('./user-routes');
const statusRoutes = require('./status-routes.js');
const taskRoutes = require('./task-routes.js');

router.use('/users', userRoutes);
router.use('/status', statusRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;