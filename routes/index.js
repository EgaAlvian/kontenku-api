const express = require('express');
const router = require('./user.route');
const userRoute = require('./user.route');
const postRoute = require('./post.route');

router.use('/users', userRoute);
router.use('/posts', postRoute);

router.use('/uploads', express.static(process.cwd() + '/uploads'));

module.exports = router;
