import * as express from 'express';
import * as mongoose from 'mongoose';
import User from '../models/usersModel';

let router = express.Router();

router.get('/', (req, res) => {
  User.find()
  .then((users)=>{
    res.json(users);
  }).catch((err)=> {
    console.log(err);
  });
});

router.get('/:id', (req, res, next) => {
  User.findOne({_id: req.params.id})
  .then((user) => {
    res.json(user);
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/register', (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.role = 'U';
  user.save()
    .then((savedUser) => res.json({token: savedUser._id, role: savedUser.role}))
    .catch((err) => res.json(err));
});

router.post('/login',(req, res) => {
  User.findOne({username: req.body.username, password: req.body.password})
    .then((foundUser) => res.json({token: foundUser._id, role: foundUser.role}))
    .catch((err) => res.json(err));
});


export default router;
