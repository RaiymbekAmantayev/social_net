const db = require('../models')
const Posts = db.posts
const Comment = db.comments
const Likes = db.likes
const Users = db.users
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')

const GetUser = async (req, res) => {
    if(req.user) {
        try {
            const user = await Users.findAll({where: {username: req.user.username}})
            res.json(user)
        } catch (err) {
            console.error(err)
        }
    }
    else{
        res.json("user not found")
    }
};

const Auth = async (req, res)=>{
const  {username, password} = req.body;
bcrypt.hash(password, 10).then((hash)=>{
    Users.create({
        username:username,
        password:hash,
    });
    res.json("Success")
})
}

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ where: { username: username } });

        if (!user) {
            return res.json({ error: "User doesn't exist" });
        }

        bcrypt.compare(password, user.password).then((match) => {
                if (!match) {
                    return res.json({ error: "Wrong username and password combination" });
                }
                const accessToken =sign({username:user.username, id:user.id},
                    "importantsecret")
                return res.json(accessToken);
            })


            .catch((error) => {
                console.error(error);
                return res.json({ error: "Error comparing passwords" });
            });
    } catch (error) {
        console.error(error);
        return res.json({ error: "Internal server error" });
    }
}


const ChangePassword = async (req, res)=>{
    const {oldPassword, newPassword} = req.body;
    const user = await Users.findOne({where:{username :req.user.username},});

    bcrypt.compare(oldPassword, user.password).then((match) => {
        if (!match) {
            return res.json({ error: "Wrong password" });
        }
        bcrypt.hash(newPassword, 10).then(async (hash)=>{
            await Users.update({password:hash},{where:{username:req.user.username}})
            res.json("Success")
        })
    })
}

const UserInfo = async (req, res)=>{
    const id = req.params.id
    try {
        const user = await Users.findByPk(id, {
            attributes: {exclude: ['password']},
        })
        if (user) {
            const post = await Posts.findAll({
                where: { username: user.username },
                include: [
                    {
                        model: Likes,
                        as: 'likes'
                    },
                    {
                        model: Comment,
                        as: 'comment'
                    }
                ],
            });
            res.status(200).send({user, post})
        } else {
            res.status(200).send("user not found")
        }
    }
    catch (err){
        console.error(err);
        return res.json({ error: "Internal server error" });
    }

}



module.exports={
    Auth,
    Login,
    GetUser,
    UserInfo,
    ChangePassword
}
