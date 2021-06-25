const User = require('./User.js');
const Task = require('./Task.js');
const Status = require('./Status.js');
const Project = require('./Project.js');
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

Task.belongsTo(Status);
Status.hasMany(Task);

Project.hasMany(Task);
Task.belongsTo(Project);

module.exports = { User, Task, Status, Project, UserProject, UserTask };