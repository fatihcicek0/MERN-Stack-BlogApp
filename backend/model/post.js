const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    imgUrl: {
        type: String,
        required: false
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    comments: [
        {
            userName: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
})

postSchema.methods.addComment = function (userName, comment) {
    const updatedComments = [...this.comments];
    updatedComments.push({
        userName: userName,
        comment: comment
    })
    this.comments = updatedComments;
    return this.save();
}
module.exports = mongoose.model('Post', postSchema);