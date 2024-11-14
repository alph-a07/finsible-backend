import express from 'express';
import morgan from 'morgan';
import logger from './utils/logger.js';

export const app = express();

const morganFormat = ':method :url :status :response-time ms';
if (process.env.NODE_ENV != 'production') {
    app.use(
        morgan(morganFormat, {
            stream: {
                write: message => {
                    const logObject = {
                        method: message.split(' ')[0],
                        url: message.split(' ')[1],
                        status: message.split(' ')[2],
                        responseTime: message.split(' ')[3],
                    };
                    logger.info(JSON.stringify(logObject).replaceAll(',', ', ').replaceAll(':', ': '));
                },
            },
        }),
    );
}
