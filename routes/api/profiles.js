const express = require('express');
const router = express.Router();
const request = require('request');
const config = require("config");
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const { remove } = require('../../models/Profile');

//  @route      GET api/profile/me
// @desc        Get Current users profile
// @access      Private
router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'There in no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//  @route      GET api/profile/
// @desc        Create or Update users profile
// @access      Private
router.post('/', [auth, [
    check('status', "Status is required").not().isEmpty(),
    check('skills', "Skills is required").not().isEmpty(),
], ], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    // Build Social Objects
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    // console.log(profileFields.skills);
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        console.log(profile);
        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            console.log(profile);
            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

//  @route      GET api/profile
// @desc        GET all profiles
// @access      Public

router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//  @route      GET api/profile/user/:user_id
// @desc        GET all profiles by user ID
// @access      Public

router.get('/user/:user_id', async(req, res) => {
    try {
        const profiles = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profiles) return res.status(400).json({ msg: 'Profile not found' });
        res.json(profiles);
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send("Server Error");
    }
});

//  @route      DELETE api/profiles/
// @desc        DELETE Profile, user & posts
// @access      Private
router.delete('/', auth, async(req, res) => {
    try {
        // @todo - remove users posts
        await Post.deleteMany({ user: req.user.id });

        // Remove profile of logged in user
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findByIdAndRemove({ _id: req.user.id });
        res.json({ msg: 'User Deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//  @route      PUT api/profile/experience
// @desc        Add profile experience
// @access      Private

router.put('/experience', [auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});


//  @route      DELETE api/profile/experience:exp_id
// @desc        Delete Profile Experience
// @access      Private

router.delete('/experience/:exp_id', [auth, ], async(req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        // console.log(profile)
        // console.log(req.params.exp_id);
        const removeIndex = await profile.experience.map(item => item.id).lastIndexOf(req.params.exp_id);
        // console.log(removeIndex);
        if (removeIndex == -1) {
            return res.json({ 'msg': 'No records found' });
        }
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});



//  @route      PUT api/profile/education
// @desc        Add profile education
// @access      Private

router.put('/education', [auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field Of Study is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});

//  @route      DELETE api/profile/education:edu_id
// @desc        Delete Profile Education
// @access      Private

router.delete('/education/:edu_id', [auth, ], async(req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        // console.log(profile)
        // console.log(req.params.exp_id);
        const removeIndex = await profile.education.map(item => item.id).lastIndexOf(req.params.edu_id);
        // console.log(removeIndex);
        if (removeIndex == -1) {
            return res.json({ 'msg': 'No records found' });
        }
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});

//  @route      GET api/profile/github:username
// @desc        Get User repos from Github
// @access      Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('gitHubClientId')}&client_secret=${config.get('gitHubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(400).json({ msg: 'No Github profile found' });
            }

            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});

module.exports = router;