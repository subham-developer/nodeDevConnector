const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

//  @route      GET api/auth
// @desc        Test route
// @access      Pubic
router.get('/', auth, (req, res) => res.send('Auth Route'));

//  @route      POST api/auth
// @desc        Test route
// @access      Pubic 
router.post('/', [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring Req.body and pulling out inputs
    const { email, password } = req.body;
    try {
        // See if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }


        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'), { expiresIn: 360000 },
            // call back function
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        // console.log(req.body);
        // res.send('User Registered');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }


});

module.exports = router;