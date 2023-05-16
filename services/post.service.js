const { Post, User, Comment } = require('../models');
const { deleteFile } = require('../middlewares/deleteFile');

const createPost = (postInfo) => {
  return Post.create(postInfo);
};

const findOneById = async (postId) => {
  const post = await Post.findOne({
    where: { id: postId },
    include: [
      {
        model: User,
        attributes: { exclude: ['password', 'token'] },
      },
    ],
  });

  if (!post) {
    throw new Error('Post not found');
  }

  return post;
};

const findAllPosts = () => {
  return Post.findAll({
    include: [
      {
        model: User,
        attributes: { exclude: ['password', 'token'] },
      },
    ],
  });
};

const updatePost = async (postId, caption) => {
  const post = await findOneById(postId);

  post.set({ caption });
  await post.save();

  return;
};

const deletePost = async (postId) => {
  const post = await findOneById(postId);

  await post.destroy();

  deleteFile(post.fileName);

  return;
};

module.exports = {
  createPost,
  findOneById,
  findAllPosts,
  updatePost,
  deletePost,
};
