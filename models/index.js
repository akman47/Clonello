const User = require('./User.js');
const Status = require('./Status.js');
const Task = require('./Task.js');

User.hasMany(Status);
Status.belongsTo(User);

Task.belongsTo(User);
User.hasMany(Task);

Task.belongsTo(Status);
Status.hasMany(Task);

module.exports = { User, Task, Status };