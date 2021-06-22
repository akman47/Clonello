const User = require('./User.js');
const Task = require('./Task.js');
const Status = require('./Status.js');
const Project = require('./Project.js');

User.hasMany(Task);
Task.belongsTo(User);

Status.hasMany(Task);
Task.belongsTo(Status);

User.belongsToMany(Task, {through: Project});
Task.belongsToMany(User, {through: Project});

Project.belongsTo(User);
Project.belongsTo(Task);
User.hasMany(Project);
Task.hasMany(Project);