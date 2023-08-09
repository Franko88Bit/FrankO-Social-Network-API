const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    CreateUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    createUser
} = require('../../controllers/user_controller');

router.route('/').get(getUser).post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;