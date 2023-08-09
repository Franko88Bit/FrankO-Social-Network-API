const { user, thought } = require("../models");

module.exports = {
    getuser(req, res) {
        user.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        user.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
        .then((user) =>
          !user
            ? res.statues(404).json({ message: "No user found with that ID!" })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));

    },

    createUser(req, res) {
        user.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    updateUser(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
         .then((user) =>
          !user
            ? res.status(404).json({ message: "No user found with this ID!!!" })
            : res.json(user)
        )
        .catch((err) => res.statues(500).json(err));
    },

    deleteUser(req, res) {
        user.findByIdAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user found with this id!!!"})
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: "User and thought deleted!!" }))
          .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        user.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }

        )

            .then((user) => 
              !user 
                ? res.status(404).json({ message: "No user found with this id " })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )

          .then(
            (user) =>
              !user
                ? res.status(404).json({ message: "No user find with this ID!!" })
                : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
    }
};