const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error'+ err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.posts = require('../models/Posts')(sequelize, DataTypes);
db.comments = require('../models/Comments')(sequelize, DataTypes);
db.users = require('../models/Users')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })



db.posts.hasMany(db.comments, {
    foreignKey: 'PostId',
    as: 'comment'
})

db.comments.belongsTo(db.posts, {
    foreignKey: 'PostId',
    as: 'post'
})

// db.users.hasMany(db.posts, {
//     foreignKey: 'UserId',
//     as: 'users'
// })
//
// db.posts.belongsTo(db.users, {
//     foreignKey: 'UserId',
//     as: 'post'
// })
module.exports = db