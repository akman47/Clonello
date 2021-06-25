const router = require('express').Router();
const { User, Task, Project, Status } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
  Status.findAll({
    include: [
      {
        model: Task,
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Project,
            attributes: ['title'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      }
    ]
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
    include: [
      {
        model: Task,
        include: [
          {
            model: User,
            attributes: ['username']
          },
          {
            model: Project,
            attributes: ['title'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      }
    ]
  })
  .then(dbStatusData => {
    if (!dbStatusData) {
      res.status(404).json({ message: 'No status found with this id' });
      return;
    }
    res.json(dbStatusData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  if (req.session) {
    Status.create({
      title: req.body.title
    })
    .then(dbStatusData => res.json(dbStatusData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
});

router.put('/:id', withAuth, (req, res) => {
  Status.update(
    {
      title: req.body.title
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

module.exports = router;