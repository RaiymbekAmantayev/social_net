const db = require('../models')
const Posts = db.posts
const Comment = db.comments
const addPosts = async (req, res) => {

    let info = {
        title: req.body.title,
        postText: req.body.postText,
        username: req.body.username,
    }

    const post = await Posts.create(info)
    res.status(200).send(post)
    console.log(post)

}

// 2. get all products
const getAllPosts = async (req, res) => {
    let posts = await Posts.findAll({})
    res.status(200).send(posts)
}
// 3. get by id
const getById =async (req, res)=>{
    const id = req.params.id;
    let post = await Posts.findByPk(id)
    res.status(200).send(post)
}
//4. update
const update = async(req, res)=>{
    const id =req.params.id;
    const newPost = req.body;
    const post = await Posts.update(newPost, id)
    res.status(200).send(post)
}
// 5.delete by id
const Destroy = async(req, res)=>{
    const id = req.params.id;
    await Posts.destroy(id)
    res.status(200).send('Product is deleted')
}

const getPostComment =  async (req, res) => {

    const id = req.params.id

    const data = await Posts.findOne({
        include: [{
            model: Comment,
            as: 'comment'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}

module.exports ={
    addPosts,
    getAllPosts,
    getById,
    update,
    Destroy,
    getPostComment
}