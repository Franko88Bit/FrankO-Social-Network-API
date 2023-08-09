const router = require('express').Router();
const user_routes = require('./user_routes');
const thought_routes = require('./thought_routes')

router.use('/users', user_routes);
router.use('/thoughts', thought_routes);

module.exports = router;