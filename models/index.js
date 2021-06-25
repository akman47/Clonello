const User = require('./User.js');
const Project = require('./Project.js');
const Task = require('./Task.js');
const Status = require('./Status.js');

User.belongsToMany(Task, {
  through: 'user_task'
});
Task.belongsToMany(User, {
  through: 'user_task'
});

User.belongsToMany(Project, {
  through: 'user_project'
});
Project.belongsToMany(User, {
  through: 'user_project'
});

Project.hasMany(Task);
Task.belongsTo(Project);

Status.hasMany(Task);
Task.belongsTo(Status);

module.exports = { User, Task, Project, Status };