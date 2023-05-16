const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const message = err.details.get('params')
      ? err.details.get('params').message
      : err.details.get('query')
        ? err.details.get('query').message
        : err.details.get('body').message;

    return res.status(400).json({
      error: message.replace(/"/g, ''),
    });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      error: err.original.sqlMessage,
    });
  }

  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    return res.status(400).json({
      error: err.errors[0].message,
    });
  }

  if (err.name === 'TypeError' || err.name === 'ReferenceError') {
    console.error(err);
    process.exit(1);
  }

  return res.status(400).json({
    error: err.message,
  });
};

module.exports = {
  errorHandler,
};
