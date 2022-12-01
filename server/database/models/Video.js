import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    imgUrl: {
        type: String,
        require: true
    },
    videoUrl: {
        type: String,
        require: true
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        trype: [String],
        default: []
    },
    likes: {
        trype: [String],
        default: []
    },
    disLikes: {
        trype: [String],
        default: []
    }
}, { timestamps: true })

export default mongoose.model("Video", UserSchema)