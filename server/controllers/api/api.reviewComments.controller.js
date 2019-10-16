const ReviewComments = require("../../models/ReviewComments.model")
const controller = {}

controller.loadAll = async (req, res, next) => {
  try {
    let comments = await ReviewComments
      .find()
      .populate('authorID')
      .skip(req.query.offset)
      .limit(req.query.limit)
      
    res.status(200).json({ commentsLoaded: true, comments })
  } catch (error) {
    res.status(500).json({ commentsLoaded: false, err: error.message })
  }
}

controller.addComment = async (req, res, next) => {
  console.log("THE REQ:BODY", req.body)
  try {
    let commentCreated = await ReviewComments.create(req.body)
    console.log("COMMENT ADDED?", commentCreated)
    res.status(200).json({ commentAdded: true, commentCreated })
  } catch (error) {
    res.status(500).json({ commentCreated: false, err: error.message })
  }
}

module.exports = controller
