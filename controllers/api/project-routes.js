const router = require('express').Router();
const { User, Task, Project } = require('../../models/');

// GET all projects
router.get('/', (req, res) => {
    Project.findAll({
        attributes: ['id','title'],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Task,
                attributes: ['id', 'task_text', 'status_id', 'user_id']
            }
        ]
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET one project
router.get('/:id', (req, res) => {
    Project.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','title'],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Task,
                attributes: ['id', 'task_text', 'status_id', 'user_id']
            }
        ]
    })
    .then(dbProjectData => {
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id' });
            return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create project
router.post('/', (req, res) => {
    Project.create({
        title: req.body.title
    })
    .then(dbProjectData => res.json(dbProjectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// EDIT group
router.put('/:id', (req, res) => {
    Project.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbProjectData => {
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this id' });
            return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE project
router.delete('/:id', (req, res) => {
    Project.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProjectData => {
        if (!dbProjectData) {
            res.status(404).json({ message: 'No project found with this data' });
            return;
        }
        res.json(dbProjectData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;