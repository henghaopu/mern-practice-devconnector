const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../ models/User');
/**
 * Just by putting auth as the second argement makes this route protected
 * @route         GET api/v1/auth
 * @description   Test route
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

module.exports = router;
