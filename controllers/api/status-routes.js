const router = require('express').Router();
const { User, Status, Task } = require('../../models');

router.get('/', (req, res) => {
  Status.findAll({
    include: [User, Task]
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
    include: [User, Task]
  })
  .then(dbStatusData => res.json(dbStatusData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // if (req.session) {
    Status.create({
      status_text: req.body.status_text,
      // user_id: req.session.user_id
      user_id: req.body.user_id
    })
    .then(dbStatusData => res.json(dbStatusData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  // }
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  if (Task) {
    Task.destroy({
      where: {
        id: req.params.id
      }
    })
  }
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