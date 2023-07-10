const express = require('express');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const userRoutes = require('./routes/user.routes');
const spaceRoutes = require('./routes/space.routes');
const { isLoggedin, isAdmin } = require('./middlewares/api-protect');

const router = express.Router();

router.get('/', (req, res) => res.send('Welcome to Remembrance API!'));

router.use('/auth', authRoutes);
router.use('/profile', isLoggedin, profileRoutes);
router.use('/spaces', spaceRoutes);
router.use('/users', isLoggedin, isAdmin, userRoutes);

module.exports = router;
