const router = require('express').Router();

const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes.js');
const taskRoutes = require('./task-routes.js');
const statusRoutes = require('./status-routes.js');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/status', statusRoutes);

module.exports = router;