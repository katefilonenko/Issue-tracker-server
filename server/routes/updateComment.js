const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.put('/:userId', async (req, res) => {
    try {
      const updatedComment= await User.findOneAndUpdate(
        { '_id': req.params.userId },
        {$set: {comment: req.body.comment}},
        function (err, doc) {
          console.log(doc);
        }
      );
      console.log(req.body);
      res.send(updatedComment);
    } catch {
      console.log({ message: err })
      res.json({ message: err });
    }
  });

  module.exports = router