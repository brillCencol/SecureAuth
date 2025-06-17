import config from './config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri)
  .then(() => {
    app.listen(config.port, () => {
      console.info(`🚀 Server running on port ${config.port}`);
    });
  })
  .catch(() => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`);
  });
