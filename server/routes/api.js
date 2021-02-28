const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  userRegister,
} = require("./auth");

router.post('/register', (req, res) => {
  userRegister(req.body, "user", res);
})


// router.post('/register', (req, res) => {
//   let userData = req.body
//   let user = new User(userData)
//   user.save((err, registeredUser) => {
//     if (err) {
//       console.log(err)
//     } else {
//       let payload = { subject: registeredUser._id }
//       let token = jwt.sign(payload, 'secretKey')
//       res.status(200).send({ token })
//     }
//   })
// })


router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else
        if (user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({ token })
        }
    }
  })
})

router.post('/', (req, res) => {
  const user = new User({
    id: req.body.id,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    location: req.body.location,
    hireDate: req.body.hireDate,
    description: req.body.description,
    severity: req.body.severity,
    status: req.body.status,
    comment: req.body.comment
  });

  user.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err })
    })
})

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (err) {
    res.json({ error: err.message || err.toString() });
  }
})


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch {
    res.json({ message: err });
  }

});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          location: req.body.location,
          hireDate: req.body.hireDate,
          description: req.body.description,
          severity: req.body.severity,
          status: req.body.status,
          comment: req.body.comment
        }
      }
    );
    res.send(updatedUser);
  } catch {
    res.json({ message: err });
  }

});


router.delete('/:id', async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.id });
    res.send(removedUser);
  } catch {
    res.json({ message: err });
  }
});


module.exports = router