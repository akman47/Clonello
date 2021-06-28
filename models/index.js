const User = require('./User.js');
const Project = require('./Project.js');
const Task = require('./Task.js');
const Status = require('./Status.js');
const UserProject = require('./UserProject.js');

User.hasMany(Task);
Task.belongsTo(User);

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

module.exports = { User, Task, Project, Status, UserProject };