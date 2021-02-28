const User = require('../models/user');

const userRegister = async (userDets, req, res) => {
    try {

        // Validate the name
        let nameNotTaken = await validateName(userDets.name);
        if (!nameNotTaken) {
            // return res.status(400).json({
            //     message: `Name is already taken.`,
            //     success: false
            // });
            return res.status(401).send('Name is already taken.')
        }

        // Validate the username
        let usernameNotTaken = await validateUsername(userDets.username);
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: `Username is already taken.`,
                success: false
            });
        }

        // validate the email
        let emailNotRegistered = await validateEmail(userDets.email);
        if (!emailNotRegistered) {
            return res.status(400).json({
                message: `Email is already registered.`,
                success: false
            });
        }

        const newUser = new User({
            ...userDets
        });

        await newUser.save();
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
};

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true;
};

const validateName = async name => {
    let user = await User.findOne({ name });
    return user ? false : true;
};

module.exports = {
    userRegister,
};