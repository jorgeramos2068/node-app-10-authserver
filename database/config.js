const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      UseUnifiedTopology: true,
    });
    console.log('Database initialized');
  } catch (error) {
    console.log(error);
    throw new Error('Error while initializing the database');
  }
};

module.exports = {
  dbConnection,
};
