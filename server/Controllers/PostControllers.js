const db = require('../models')
const Posts = db.posts
const Comment = db.comments
const Likes = db.likes
const multer = require('multer')
const path = require('path')

const addPosts = async (req, res) => {
    const user = req.user.username
    let info = {
        image: req.file.path,
        title: req.body.title,
        postText: req.body.postText,
        username: user,
    }

    const post = await Posts.create(info)
    res.status(200).send(post)
    console.log(post)

}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|webp/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

// 2. get all products
const getAllPosts = async (req, res) => {
    let posts = await Posts.findAll(
{include: [{
            model: Likes,
            as: 'likes'
}]},)
    res.status(200).send(posts)
}
// 3. get by id
const getById =async (req, res)=>{
    const id = req.params.id;
    let post = await Posts.findByPk(id)
    res.status(200).send(post)
}
//4. update
const update = async (req, res) => {
    const id = req.params.id;
    const user = req.user.username;
    let newPost = {
        image: req.file.path,
        title: req.body.title,
        postText: req.body.postText,
        username: user
    }
    try {
        const post = await Posts.findByPk(id)

        if(post && user == post.username){

            const [updatedRows] = await Posts.update(newPost, {
                where: { id: id }
            });
            if (updatedRows === 1) {
                res.status(200).send({ message: "Пост успешно обновлен" });
            } else {
                res.status(404).send({ message: "Пост не найден" });
            }
        }
        else {
            res.status(403).json("You don't have access to delete or the post doesn't exist");
        }

    } catch (error) {
        res.status(500).send({ message: "Произошла ошибка при обновлении поста", error: error.message });
    }
}

// 5.delete by id
const Destroy = async (req, res) => {
    const user = req.user.username;
    const id = req.params.id;
    try {
        const post = await Posts.findByPk(id);
        if (post && user === post.username) {
            await Posts.destroy({
                where: { id: id }
            });
            res.status(200).send('Product is deleted');
        } else {
            res.status(403).json("You don't have access to delete or the post doesn't exist");
        }
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
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





const getPostUser = async (req, res) => {
    const user = req.user.username
    let posts = await Posts.findAll({
        where: { username: user },
        include: [{
            model: Likes,
            as: 'likes'
        }]
    })
    res.status(200).send(posts)
}

const UserLikedPosts = async (req, res) => {
    const user = req.user.username;

    try {
        const likes = await Likes.findAll({
            where: { username: user },
            attributes: ['PostId'] // Получаем только PostId из лайков
        });

        const postIds = likes.map(like => like.PostId);

        const posts = await Posts.findAll({
            where: { id: postIds }
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports ={
    addPosts,
    getAllPosts,
    getById,
    update,
    Destroy,
    getPostComment,
    upload,
    getPostUser,
    UserLikedPosts
}