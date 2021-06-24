const router = require('express').Router();
const { User, Project, Task, UserProject, UserTask } = require('../../models');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: ['id', 'username'],
        include: [
            {
                model: Project,
                attributes: ['id', 'title']
            },
            {
                model: Task,
                attritubtes: ['id', 'task_text', 'status_id']
            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET one user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Project,
                attributes: ['id', 'title']
            },
            {
                model: Task,
                attritubtes: ['id', 'task_text', 'status_id']
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// CREATE  user
router.post('/', (req,res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// UPDATE user's project  /api/users/task
router.put('/task', (req, res) => {
    // to add later: make sure session exists first
    Post.task({ ...req.body, user_id }, {UserTask})
        .then(updatedUserData => res.json(updatedUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// UPDATE user's task /api/users/project
router.put('/project', (req, res) => {
    // to add later: make sure session exists first
    Post.project({ ...req.body, user_id }, {UserProject})
        .then(updatedUserData => res.json(updatedUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// UPDATE user 
router.put('/:id', (req, res) => {
    User.update(
        {
            username: req.body.username
        },
        { 
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;