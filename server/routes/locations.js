const express = require('express');
const router = express.Router();
const Location = require('../models/location');

const {
    locationValidation,
  } = require("./validate_location");
  
  router.post('/', (req, res) => {
    locationValidation(req.body, "user", res);
  })

// router.post('/', (req, res) => {
//     const location = new Location({
//         locname: req.body.locname
//     });
//     location.save()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json({ message: err })
//         })
// })

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    }
    catch (err) {
        res.json({ error: err.message || err.toString() });
    }
})

module.exports = router