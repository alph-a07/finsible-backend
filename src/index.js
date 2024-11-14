import { app } from './app.js';
import logger from './utils/logger.js';

const port = process.env.port || 3000;

const server = app.listen(port, () => {
    logger.info(`App running on ${port} port`);
});
