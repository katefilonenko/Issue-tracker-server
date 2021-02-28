const Location = require('../models/location');

const locationValidation = async (locationDets, req, res) => {
    try {

        // Validate the name
        let nameNotTaken = await validateName(locationDets.locname);
        if (!nameNotTaken) {
            // return res.status(400).json({
            //     message: `Name is already taken.`,
            //     success: false
            // });
            return res.status(401).send('Name is already taken.')
        }


        const newLocation = new Location({
            ...locationDets
        });

        await newLocation.save();
        return res.status(201).json({
            message: "You are successfully registred. Please now login.",
            success: true
        });
    } catch (err) {
        // Implement logger function (winston)
        return res.status(500).json({
            message: "Unable to create your account.",
            success: false
        });
    }
}

const validateName = async locname => {
    let user = await Location.findOne({ locname });
    return user ? false : true;
};

module.exports = {
    locationValidation
};