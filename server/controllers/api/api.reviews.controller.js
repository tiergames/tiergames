const controller = {}
const Reviews = require("../../models/Reviews.model")
const Platforms = require("./../../models/Platforms.model")

controller.loadReviews = async (req, res, next) => {
  try {
    let reviews = await Reviews
      .find()
      .populate("author")
      .populate("platform")
      .select({title: 1, platform: 1, author: 1, totalRating: 1, gameID: 1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)

      res.status(200).json({reviews})
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
    console.log(error)
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
      // .populate("author")
      .skip(req.query.offset)
      .limit(req.query.limit)
    
    reviewsByPlatform = reviewsByPlatform.filter(review => review.platform.id === +req.params.platformID)
      
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
    historyContent, historyRating,
    graphicsContent, graphicsRating,
    soundContent, soundRating,
    gameplayContent, gameplayRating,
    author, pros, cons, gameID
  } = req.body

  if (!title || !platform || !review
    || !historyRating || !graphicsRating || !soundRating
    || !gameplayRating
  ) {
    res.status(500).json({err: 'Please, fill all the required fields'})
  }

  try {
    let totalRating = ((+historyRating + +graphicsRating + +soundRating + +gameplayRating) / 4).toFixed(1)
    let reviewCreated = await Reviews.create({
      title, platform, review,
      history: { content: historyContent, rating: historyRating },
      graphics: { content: graphicsContent, rating: graphicsRating },
      sound: { content: soundContent, rating: soundRating },
      gameplay: { content: gameplayContent, rating: gameplayRating },
      author, pros, cons,
      totalRating, gameID
    })

    res.status(200).json({message: 'Review added successfully', reviewCreated})
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}

module.exports = controller
