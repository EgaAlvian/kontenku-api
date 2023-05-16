const postService = require('../services/post.service');
const { deleteFile } = require('../middlewares/deleteFile');

const createPost = async (req, res, next) => {
  const postInfo = req.body;
  if (!req.file) {
    return next(new Error('Please upload file'));
  }

  postInfo.userId = req.user.id;
  postInfo.fileName = req.file.filename;

  try {
    const post = await postService.createPost(postInfo);

    res.status(201).json({ post });
  } catch (error) {
    deleteFile(req.file.filename);
    return next(error);
  }
};

const findOnePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await postService.findOneById(postId);

    res.status(200).json({ post });
  } catch (error) {
    return next(error);
  }
};

const findAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.findAllPosts();

    res.status(200).json({ posts });
  } catch (error) {
    return next(error);
  }
};

const updatePost = async (req, res, next) => {
  const { caption } = req.body;
  const { postId } = req.params;

  try {
    await postService.updatePost(postId, caption);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    return next(error);
  }
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    await postService.deletePost(postId);

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createPost,
  findOnePost,
  findAllPosts,
  updatePost,
  deletePost,
};
