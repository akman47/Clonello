const User = require('./User.js');
const Project = require('./Project.js');
const Task = require('./Task.js');
const Status = require('./Status.js');
const UserProject = require('./UserProject');
const UserTask = require('./UserTask');

User.belongsToMany(Task, {
  through: UserTask
});
Task.belongsToMany(User, {
  through: UserTask
});

User.belongsToMany(Project, {
  through: UserProject
});
Project.belongsToMany(User, {
  through: UserProject
});

Project.hasMany(Task);
Task.belongsTo(Project);

Status.hasMany(Task);
Task.belongsTo(Status);

module.exports = { User, Task, Project, Status, UserTask, UserProject };