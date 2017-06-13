import * as express from 'express';
import * as mongoose from 'mongoose';
import User from '../models/usersModel';

let router = express.Router();
// //get all
// router.get('/', (req, res) => {
//   User.find()
//   .then((users)=>{
//     res.json(users);
//   }).catch((err)=> {
//    res.status(500);//this should NEVER happen, but if it does cuz db server is down
//     console.log(err);
//   });
// });
// //get by id
// router.get('/:id', (req, res, next) => {
//   User.findOne({_id: req.params.id})
//   .then((user) => {
//     res.json(user);
//   }).catch((err) => {
//       res.status(404).send('user not found');
//     console.log(err);
//   });
// });
//add
router.post('/register', (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.role = 'U'; //can I also put 'A' here?
  user.save()
    .then((savedUser) => {
        res.status(200)
          .json({
            token: savedUser._id,
            role: savedUser.role
          });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//login
router.post('/login',(req, res) => {
  User.findOne({username: req.body.username, password: req.body.password})
    .then((foundUser) => {
      res.status(200)
        .json({
          token: foundUser._id,
          role: foundUser.role
        });
    })
    .catch((err) => {
        res.status(401).send('username or password not found');
    });
  });


export default router;
