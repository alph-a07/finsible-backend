import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import logger from './utils/logger.js';
import router from './routes/routes.js';

export const app = express();

const morganFormat = ':method :url :status :response-time ms';
if (process.env.NODE_ENV != 'production') {
  app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(' ')[0],
            url: message.split(' ')[1],
            status: message.split(' ')[2],
            responseTime: message.split(' ')[3],
          };
          logger.info(
            JSON.stringify(logObject)
              .replaceAll(',', ', ')
              .replaceAll(':', ': '),
          );
        },
      },
    }),
  );
}

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', router);

const uri = process.env.DB_URL;
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

try {
  await mongoose.connect(uri, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  logger.info('Connection to MongoDB Successful.');
} catch (error) {
  logger.error('Error connecting to MongoDB', error);
}
