import Comment from '../database/models/Comment.js'
import Video from '../database/models/Video.js'
import createError from '../error.js'
export const addComment = async (req, res, next) => {
    try {
        const newComment = await Comment.create({ ...req.body, userId: req.user.id })
        res.json(newComment).status(200)
    } catch (error) {
        next(error)
    }
}
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (req.user.id === comment.userId || req.user.id === video.id) {
            await Comment.findByIdAndDelete(req.params.id)
            return res.json({ message: "the comment has been deleted" })
        } else {
            return next(createError(403, "you can delete only your comment"))
        }
    } catch (error) {
        next(error)
    }
}
export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.json(comments).status(200)
    } catch (error) {
        next(error)
    }
}