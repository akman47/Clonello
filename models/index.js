const User = require('./User.js');
const Project = require('./Project.js');
const Task = require('./Task.js');
const Status = require('./Status.js');

User.hasMany(Project);
Project.belongsTo(User);

Task.belongsTo(User);
User.hasMany(Task);

Task.belongsTo(Project);
Project.hasMany(Task);

Status.hasMany(Task);
Task.belongsTo(Status);

module.exports = { User, Task, Project, Status };