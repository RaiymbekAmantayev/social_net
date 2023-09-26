const db = require('../models')
const Comment = db.comments
const Post = db.posts
//
const Comments = async (req, res)=>{
    const comments = await Comment.findAll();
    res.json(comments);
}

const UserComments = async (req, res) => {
    const user = req.user.username;

    try {
        const comments = await Comment.findAll({
            where: { username: user }
        });

        const postIds = comments.map(comment => comment.PostId);

        const posts = await Post.findAll({
            where: { id: postIds }
        });

        res.status(200).json({ posts, comments });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


//
const AddComment = async (req, res) => {
    const id = req.params.id
    const user = req.user.username
    let com = {
        PostId: id,
        commentBody: req.body.commentBody,
        username: user
    }

    const comment = await Comment.create(com);
    res.json(comment);
};
const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;

    try {
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Комментарий не найден" });
        }

        await comment.destroy();

        return res.status(200).json({ message: "Комментарий успешно удален" });
    } catch (error) {
        return res.status(500).json({ message: "Произошла ошибка при удалении комментария", error: error.message });
    }
};

module.exports={
    Comments,
    AddComment,
    deleteComment,
    UserComments
}
