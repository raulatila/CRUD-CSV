const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const User = require('./models/User');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced!');
});

app.use('/users', userRoutes);

app.post('/import', (req, res) => {
  const users = [];
  const csvFilePath = path.join(__dirname, 'users.csv');

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      users.push(row);
    })
    .on('end', async () => {
      try {
        await User.bulkCreate(users, { validate: true });
        res.status(200).json({ message: 'Users imported successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to import users' });
      }
    })
    .on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to read CSV file' });
    });
});

module.exports = app;