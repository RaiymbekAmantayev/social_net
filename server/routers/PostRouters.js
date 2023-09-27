const postController = require('../Controllers/PostControllers')
const commentController = require('../Controllers/CommentController')
const userController = require('../Controllers/UsersController')
const router = require('express').Router()
const passport = require('../middlewares/AuthMiddleware')
const likeController = require('../Controllers/LikeController')
const {upload} = require("../Controllers/PostControllers");

// Добавить пост
router.post('/addPost', passport.authenticate('jwt', {session: false}), postController.upload, postController.addPosts)

// Найти все посты
router.get('/all', postController.getAllPosts)

// find by id
router.get('/:id', postController.getById)

// updating
router.put('/update/:id', passport.authenticate('jwt', {session: false}), postController.upload, postController.update)

// deleting
router.delete('/:id', passport.authenticate('jwt', {session: false}), postController.Destroy)

// Найти пост с комментами
router.get('/comments/:id', postController.getPostComment)

// удалить коммент ко коммент id
router.delete('/deletecom/:commentId', passport.authenticate('jwt', {session: false}), commentController.deleteComment)

// написать комментарии к посту по id поста
router.post('/addcomment/:id',  passport.authenticate('jwt', {session: false}),  commentController.AddComment)

// регистрация
router.post('/auth', userController.Auth)

// Войти
router.post('/auth/login', userController.Login)

// Информация о текущем юзере
router.get('/auth/getuser',passport.authenticate('jwt', {session: false}), userController.GetUser)

// поставить лайк
router.post('/like', passport.authenticate('jwt', {session: false}),likeController.Liking )

// Найти все посты которые принадлежащему юзеру
router.get('/users/post',passport.authenticate('jwt', {session: false}), postController.getPostUser)

// Найти все посты и комменты который юзер добавил
router.get('/users/comments',passport.authenticate('jwt', {session: false}), commentController.UserComments)

// все посты который юзер лайкнул
router.get('/users/likes',passport.authenticate('jwt', {session: false}), postController.UserLikedPosts)

// вся инфа о юзере + посты который он выложил
router.get('/users/info/:id', userController.UserInfo)

//
router.put('/users/edit', passport.authenticate('jwt', {session: false}), userController.ChangePassword)

module.exports=router