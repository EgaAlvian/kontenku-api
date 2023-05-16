const fs = require('fs');

const dir = process.cwd() + '/uploads/';

const deleteFile = (filename) => {
  fs.unlinkSync(dir + filename);
};

module.exports = { deleteFile };
