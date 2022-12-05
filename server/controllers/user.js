import User from "../database/models/User.js"
import createError from "../error.js"
import Video from "../database/models/Video.js";
export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.json(updatedUser).status(200)
        } catch (error) {
            next(error)
        }
    }
    else {
        next(createError(403, 'You can only update your account!'))
    }
}
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
export const subscribe = async (req, res, next) => {
    try {
        const isSubscribed = await User.find({ subscribedUsers: { "$in": [req.params.id] } });
        if (!isSubscribed.length) {
            await User.findByIdAndUpdate(req.user.id, {
                $push: { subscribedUsers: req.params.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: 1 },
            });
            return res.status(200).json("Subscription successfull.")
        }
        return next(createError(400, "already subscribed"));
    } catch (err) {
        next(err);
    }
}
export const unSubscribe = async (req, res, next) => {
    try {
        const isSubscribed = await User.find({ subscribedUsers: { "$in": [req.params.id] } });
        if (isSubscribed) {
            await User.findByIdAndUpdate(req.user.id, {
                $pull: { subscribedUsers: req.params.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 },
            });
            return res.status(200).json("Unsubscription successfull.")
        }
        return next(createError(400, "not subscribed to this channer"))
    } catch (err) {
        next(err);
    }
}
export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { disLikes: id }
        })
        res.status(200).json("The video has been liked.")
    } catch (err) {
        next(err);
    }
}
export const disLike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { disLikes: id },
            $pull: { likes: id }
        })
        res.status(200).json("The video has been disliked.")
    } catch (err) {
        next(err);
    }
}