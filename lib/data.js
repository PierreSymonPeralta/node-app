/**
 * Storing and editing data
 */

const fs = require('fs');
const path = require('path');

// Container for this module
const lib = {};

// Base directory
lib.baseDir = path.join(__dirname, '/../.data/');

lib.create = (dir, file, data, cb) => {
  // Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor)=> {
    if(!err && fileDescriptor){

      // Convert data to string
      const stringData = JSON.stringify(data);

      // Write to file and close it
      fs.writeFile(fileDescriptor, stringData, (err) => err && cb('Error writing to new file'));
      fs.close(fileDescriptor,(err) => err && cb('Error in closing file'));

    } else {
      console.log(err);
      cb('Could not create new file, it may already exist');    
    }
  });
}


lib.read = (dir, file, cb) => {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', (err, data)=> {
    cb(err, data);
  });
}


lib.update = (dir, file, data, cb) => {
  // TODO
}

// Export the module
module.exports = lib;
