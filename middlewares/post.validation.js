const { celebrate, Joi, errors, Segments } = require('celebrate');

const createPost = () => {
  return celebrate({
    [Segments.BODY]: Joi.object({
      caption: Joi.string().required(),
    }),
  });
};

const findOnePost = () => {
  return celebrate({
    [Segments.PARAMS]: Joi.object({
      postId: Joi.number().required(),
    }),
  });
};

const updatePost = () => {
  return celebrate({
    [Segments.PARAMS]: Joi.object({
      postId: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object({
      caption: Joi.string().required(),
    }),
  });
};

const deletePost = () => {
  return celebrate({
    [Segments.PARAMS]: Joi.object({
      postId: Joi.number().required(),
    }),
  });
};

module.exports = {
  createPost,
  findOnePost,
  updatePost,
  deletePost,
};
