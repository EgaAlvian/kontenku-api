const postService = require('../services/post.service');

const checkPostOwnership = async (req, res, next) => {
  const { postId } = req.params;
  const post = await postService.findOneById(postId);

  if (post.userId !== req.user.id) {
    return next(new Error('Unauthorized'));
  }

  next();
};

module.exports = { checkPostOwnership };
