const controller = {}
const Reviews = require("../../models/Reviews.model")

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
