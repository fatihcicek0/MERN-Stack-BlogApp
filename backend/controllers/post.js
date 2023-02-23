const Category = require('../model/category');
const Post = require('../model/post');
const fs = require('fs');

exports.getPosts = (req, res) => {
    Post.find()
        .then(posts => {
            res.send({
                posts
            })
        }).catch(err => { console.log(err) });
}

exports.addPost = (req, res) => {
    const { title, content, userId, categoryId } = req.body;
    const imgUrl = req.file;

    const newPost = new Post({
        title: title,
        content: content,
        imgUrl: imgUrl.filename,
        userId: userId,
        categoryId: categoryId,
        postComments: { comments: [] },
        comments: []
    })
    newPost.save()
        .then(() => {
            res.send({
                message: 'Post added !'
            })
        }).catch(err => { console.log(err) });
}

exports.getPostById = (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            res.send({ post })
        }).catch(err => { console.log(err) });
}
exports.getPostsByUserId = (req, res) => {
    Post.find({ userId: req.params.userId })
        .then(posts => {
            res.send({
                posts
            })
        }).catch(err => { console.log(err) });
}

exports.updatePost = (req, res) => {
    const { title, content, categoryId, userId, postId } = req.body;
    const imgUrl = req.file;
    Post.findOne({ _id: postId })
        .then(post => {
            post.title = title;
            post.content = content;
            post.categoryId = categoryId;
            post.userId = userId;
            if (imgUrl) {
                fs.unlink('public/' + post.imgUrl, err => {
                    err && console.log(err);

                })
                post.imgUrl = imgUrl.filename;
            }
            return post.save();

        }).then((post) => {
            res.send({
                message: 'Updated !',
                post: post
            })
        }).catch(err => { console.log(err); });
}

exports.deletePost = (req, res) => {
    Post.deleteOne({ _id: req.params.postId })
        .then(() => {
            res.send({ message: 'deleted!' })
        }).catch(err => { console.log(err) });
}

exports.getPostsByCategoryId = (req, res) => {
    Post.find({ categoryId: req.params.categoryId })
        .then(posts => {
            res.send({ posts });
        }).catch(err => { console.log(err) });
}

exports.getCategories = (req, res) => {
    Category.find()
        .then(categories => {
            res.send({
                categories
            })
        }).catch(err => { console.log(err) })
}

exports.addComment = (req, res) => {
    const { postId, userName, comment } = req.body;
    Post.findById({ _id: postId })
        .then(post => {
            post.addComment(userName, comment);
            res.send({
                message: 'commet is added '
            })
        }).catch(err => {
            console.log(err);
        });
}
exports.addCategory=(req,res)=>{
    const {name}=req.body;
    const category=new Category({
        name:name
    });
    category.save();
}