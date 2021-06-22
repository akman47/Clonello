const router = require('express').Router();

const userRoutes = require('./user-routes');
const taskRoutes = require('./task-routes.js');
const statusRoutes = require('./status-routes.js');
const projectRoutes = require('./project-routes');

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/status', statusRoutes);
router.use('/projects', projectRoutes);

module.exports = router;