const postController = require('../Controllers/PostControllers')
const commentController = require('../Controllers/CommentController')
const userController = require('../Controllers/UsersController')
const router = require('express').Router()

router.post('/addPost', postController.addPosts)
router.get('/all', postController.getAllPosts)
router.get('/:id', postController.getById)
router.put('/update/:id', postController.update)
router.delete('/:id', postController.Destroy)
router.get('/comments/:id', postController.getPostComment)

router.post('/addcomment/:id', commentController.AddComment)

router.post('/auth', userController.Auth)
router.post('/auth/login', userController.Login)

module.exports=router