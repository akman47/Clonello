const router = require('express').Router();
const { 
  // Project, 
  User, Task, Status } = require('../models/');

router.get('/', (req, res) => {
  console.log(req.session);
  Status.findAll({
    // where: {
    //   user_id: req.session.user_id
    // },
    include: [User, Task]
  })
  .then(dbStatusData => {
    const statuses = dbStatusData.map(Status => Status.get({ plain: true }));
    res.render('dashboard.handlebars', {
      statuses
      // loggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// router.get('/edit/:id', withAuth, (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: ['id', 'title', 'body', 'created_at'],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       },
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       }
//     ]
//   })
//   .then(dbPostData => {
//     if (!dbPostData) {
//       res.status(404).json({ message: 'No post found with this id' });
//       return;
//     }

//     const post = dbPostData.get({ plain: true });
//     res.render('edit-post', {
//       post,
//       loggedIn: true
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// })

module.exports = router;