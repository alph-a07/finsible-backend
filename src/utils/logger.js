import { createLogger, format, transports } from 'winston';
const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message }) => {
        return `${level}: ${message}`;
    }),
);

// Create a Winston logger
const logger = createLogger({
    level: 'info',
    format: combine(colorize(), timestamp(), json()),
    transports: [
        new transports.Console({
            format: consoleLogFormat,
        }),
    ],
});

// Enable file logs only for production
if (process.env.NODE_ENV == 'production') {
    logger.add(new transports.File({ filename: 'app.log' }));
}

export default logger;