const router = require('express').Router();
const { authentication } = require('../middlewares/authentication');
const uploader = require('../middlewares/uploader');
const postController = require('../controllers/post.controller');
const postValidation = require('../middlewares/post.validation');
const { checkPostOwnership } = require('../middlewares/checkPostOwnership');

router.post(
  '/',
  authentication,
  uploader.single('file'),
  postValidation.createPost(),
  postController.createPost
);

router.get('/', authentication, postController.findAllPosts);

router.get(
  '/:postId',
  authentication,
  postValidation.findOnePost(),
  postController.findOnePost
);

router.put(
  '/:postId',
  authentication,
  checkPostOwnership,
  postValidation.updatePost(),
  postController.updatePost
);

router.delete(
  '/:postId',
  authentication,
  checkPostOwnership,
  postValidation.deletePost(),
  postController.deletePost
);

module.exports = router;
