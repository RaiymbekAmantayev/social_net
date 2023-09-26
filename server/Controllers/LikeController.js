const db = require('../models')
const Like = db.likes
const Liking = async (req,res)=>{
    const user = req.user.username;
    let newLike = {
        PostId: req.body.PostId,
        username: user
    }
    const found = await Like.findOne({
        where:{PostId: req.body.PostId, username: user},
})
    if(!found){
        await Like.create(newLike);
        res.json({liked:true});
    }else{
        await Like.destroy({
            where:{PostId: req.body.PostId, username: user},
        })
        res.json({liked:false});
    }


}
module.exports={
    Liking
}

