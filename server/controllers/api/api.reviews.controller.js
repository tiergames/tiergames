const controller = {}
const Reviews = require("../../models/Reviews.model")
const Platforms = require("./../../models/Platforms.model")
const User = require("./../../models/User")

controller.loadReviews = async (req, res, next) => {
  try {
    let reviews = await Reviews
      .find()
      .populate("author")
      .populate("platform")
      .select({title: 1, platform: 1, author: 1, totalRating: 1, gameID: 1, })
      .skip(+req.query.offset)
      .limit(+req.query.limit)

      res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

controller.loadReview = async (req, res, next) => {
  try {
    let review = await Reviews.findById(req.params.reviewID)
      .populate("platform")
      .populate("author")
    
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.loadUserReviews = async (req, res, next) => {
  try {
    let userReviews = await Reviews.find({author: req.params.userID})
      .populate("author")
      .populate("platform")
      .select({title: 1, platform: 1, author: 1, totalRating: 1, gameID: 1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)
      
    res.status(200).json(userReviews)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.loadGameReviews = async (req, res, next) => {
  try {
    let gameReviews = await Reviews
      .find({gameID: req.params.gameID})
      .populate("author")
      .populate("platform")
      .select({title: 1, platform: 1, author: 1, totalRating: 1, gameID: 1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)
      
    res.status(200).json(gameReviews)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.deleteReview = async (req, res, next) => {
  try {
    let deletedReview = await Reviews.findByIdAndDelete(req.params.reviewID)
    res.status(200).json({message: "Review deleted successfully"})
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.reviewsByPlatform = async (req, res, next) => {
  try {
    let reviewsByPlatform = await Reviews
      .find()
      .populate("platform")
      .find({
        platform: {
          _id: req.params.platformID
        }
      })
      .populate("author")
      .skip(+req.query.offset)
      .limit(+req.query.limit)
      
    res.status(200).json(reviewsByPlatform)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.loadRelationatedReviews = async (req, res, next) => {
  try {
    let relationatedReviews = await Reviews.find({gameID: req.params.gameID, _id: {$ne: req.params.currentReviewID}})
      .populate("author")
      .populate("platform")
      .skip(+req.query.offset)
      .limit(+req.query.limit)

    // relationatedReviews = relationatedReviews.filter(review => review.platform.id)
    
    res.status(200).json(relationatedReviews)
  } catch (error) {
    res.status(500).json({err: error.message})
  }
}

controller.addReview = async (req, res, next) => {
  const {
    title, platform, review,
    history, graphics, sound, gameplay,
    author, pros, cons, gameID, gameName
  } = req.body

  if (!title || !platform || !review
    || !history.rating || !graphics.rating || !sound.rating
    || !gameplay.rating
  ) {
    res.status(500).json({err: 'Please, fill all the required fields'})
  }

  try {
    let totalRating = ((+history.rating + +graphics.rating + +sound.rating + +gameplay.rating) / 4).toFixed(1)
    let reviewCreated = await Reviews.create({
      title, platform, review,
      history,
      graphics,
      sound,
      gameplay,
      author, pros, cons,
      totalRating, gameID, gameName
    })

    res.status(200).json({created: true, reviewCreated})
  } catch (err) {
    res.status(500).json({created: false, err: err.message})
  }
}

controller.follow = async (req, res, next) => {
  try {
    let { reviewID, followerID } = req.body
    let reviewFollowRequest = await Reviews.findByIdAndUpdate(reviewID, { $push: { followers: followerID } }, { new: true })
    let followerRequest = await User.findByIdAndUpdate(followerID, { $push: { savedReviews: reviewID } }, { new: true })

    res.status(200).json({ reviewFollowRequestDone: true, reviewFollow: reviewFollowRequest, follower: followerRequest })
  } catch (error) {
    res.status(200).json({ reviewFollowRequest: false, err: error.message })
  }
}

module.exports = controller
