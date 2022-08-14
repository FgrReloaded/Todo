const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();




const jwtToken = process.env.JWT_TOKEN;
//ROUTE 1: Create a new user
router.post('/signup', async (req, res) => {
    try {
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "This email has already existed. Try Login", success})
        }

        // code for securing password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //  create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtToken)

        // res.json(user)
        res.json({ authToken, success: true })
        // catch the error and send bad request with message.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
});

//ROUTE 2: Authenticate Existing a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let success= false;
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Email or password you enter is incorrect.", success })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ error: "Email or password you enter is incorrect.", sucess })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtToken)
        // res.json(user)
        res.json({ authToken, success: true })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured")
    }
});


module.exports = router