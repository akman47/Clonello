const { Status } = require('../models');

const statusData = [
  {
    id: 1,
    title: 'To Do'
  },
  {
    id: 2,
    title: 'In Progress'
  },
  {
    id: 3,
    title: 'Complete'
  }
]

Status.bulkCreate(statusData);