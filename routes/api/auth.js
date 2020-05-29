const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../ models/User');

/**
 * Just by putting auth as the second argement makes this route protected
 * @route         GET api/v1/auth
 * @description   Get authenticated user infomation
 * @access        Public
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route         POST api/v1/auth
 * @description   Login user
 * @access        Public
 */
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please is required').exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('privateKey'),
        { expiresIn: 360000 }, // 3600 sec = 1 hr, 360000 for development
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
