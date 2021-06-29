const { Status } = require('../models');

const statusData = [
  {
    title: 'To Do'
  },
  {
    title: 'In Progress'
  },
  {
    title: 'Complete'
  }
]

const seedStatus = () => Status.bulkCreate(statusData);

seedStatus();