const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
/**
 * Just by putting auth as the second argement makes this route protected
 * @route         GET api/v1/auth
 * @description   Test route
 * @access        Public
 */
router.get('/', auth, (req, res) => res.send('Auth route'));

module.exports = router;
