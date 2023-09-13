const db = require('../models')
const Posts = db.posts
const Comment = db.comments
const Users = db.users
const bcrypt = require('bcrypt')

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

        bcrypt.compare(password, user.password)
            .then((match) => {
                if (!match) {
                    return res.json({ error: "Wrong username and password combination" });
                }
                return res.json("You logged in");
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


module.exports={
    Auth,
    Login
}
