const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const User = require('../models/User');

const importCSV = async () => {
  const users = [];
  const filePath = path.join(__dirname, '..', 'users.csv'); 
  
  console.log('filePath:', filePath); 

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => users.push(row))
      .on('end', async () => {
        try {
          await User.bulkCreate(users, { validate: true });
          resolve(users);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => reject(error));
  });
};

module.exports = { importCSV };