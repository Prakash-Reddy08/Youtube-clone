import User from "../database/models/User.js"
import Video from "../database/models/Video.js"
import createError from "../error.js"

export const addVideo = async (req, res, next) => {
    try {
        const video = await Video.create({ userId: req.user.id, videoUrl: `/${req.file.path}`, ...req.body })
        res.json({ video }).status(200)
    } catch (err) {
        next(err)
    }
}
export const updateVideo = async (req, res, next) => {
    try {
        const foundVideo = await Video.findById(req.params.id);
        if (!foundVideo) return next(createError(400, "Video not found"))
        if (req.user.id === foundVideo.userId) {
            const updateVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.json(updateVideo).status(200)
        } else {
            return next(createError(403, "You can update only your vidoes"))
        }
    } catch (error) {
        next(error)
    }
}
export const deleteVideo = async (req, res, next) => {
    try {
        const foundVideo = await Video.findById(req.params.id);
        if (!foundVideo) return next(createError(400, "Video not found"))
        if (req.user.id === foundVideo.userId) {
            await Video.findByIdAndDelete(req.params.id)
            res.json({ message: "Video deleted", sucess: true }).status(200)
        } else {
            return next(createError(403, "You can delete only your vidoes"))
        }
    } catch (error) {
        next(error)
    }
}
export const getVideo = async (req, res, next) => {
    try {
        const foundVideo = await Video.findById(req.params.id);
        if (!foundVideo) return next(createError(400, "No video found"))
        res.json(foundVideo).status(200)
    } catch (error) {
        next(error)
    }
}
export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
}
export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
}

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};