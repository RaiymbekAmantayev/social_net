module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        PostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts', // This should be the actual name of your Post model
                key: 'id',
            }
        },
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Comment;
};
