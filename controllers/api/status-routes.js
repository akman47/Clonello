const router = require('express').Router();
const { Status, Task } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Status.findAll({
    include: {
      model: Task,
      attributes: ['id', 'task_text']
    }
  })
  .then(dbStatusData => res.json(dbStatusData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Status.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Task,
      attributes: ['id', 'task_text']
    }
  })
  .then(dbStatusData => res.json(dbStatusData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Status.create({
      status_text: req.body.status_text
    })
    .then(dbStatusData => res.json(dbStatusData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
});

router.put('/:id', withAuth, (req, res) => {
  Status.update(
    {
      status_text: req.body.status_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbStatusData => {
    if (!dbStatusData) {
      res.status(404).json({ message: 'No status found with this id' });
      return;
    }
    res.json(dbStatusData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
  Status.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbStatusData => {
    if (!dbStatusData) {
      res.status(404).json({ message: 'No Status found with this id' });
      return;
    }
    res.json(dbStatusData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;