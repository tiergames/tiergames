const controller = {}
const User = require("./../../models/User")

controller.getLoggedInUserProfile = async (req, res, next) => {

}

controller.getProfile = async (req, res, next) => {
  try {
    let userProfile = await User.findOne({ username: {$eq: req.params.username} })
    res.status(200).json({ userProfileFound: true, userProfile })
  } catch (error) {
    res.status(500).json({ userProfileFound: false, err: error.message })
  }
}

controller.follow = async (req, res, next) => {
  try {
    let { follower, followed } = req.body
    let followerProfile = await User.findByIdAndUpdate(follower._id, { $push: { following: follower._id } }, { new: true })
    let followedProfile = await User.findByIdAndUpdate(followed._id, { $push: { followers: follower._id } }, { new: true })
    
    res.status(200).json({ followRequest: true, follower: followerProfile, followed: followedProfile })
  } catch (error) {
    res.status(500).json({ followRequest: true, err: error.message })
  }
}

module.exports = controller
