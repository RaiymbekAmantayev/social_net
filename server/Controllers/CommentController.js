const db = require('../models')
const Comment = db.comments
//
const Comments = async (req, res)=>{
    const comments = await Comment.findAll();
    res.json(comments);
}

//
const AddComment = async (req, res) => {
    const id = req.params.id
    let com = {
        PostId: id,
        commentBody: req.body.commentBody
    }
    const comment = await Comment.create(com);
    res.json(comment);
};

module.exports={
    Comments,
    AddComment
}
