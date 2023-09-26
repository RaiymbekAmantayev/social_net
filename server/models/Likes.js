const Post = require("../models/Posts");
const User = require("../models/Users");
module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('likes', {
        PostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts', // This should be the actual name of your Post model
                key: 'id',
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Likes;
};