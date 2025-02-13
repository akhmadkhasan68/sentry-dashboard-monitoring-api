import { createLogger, transports, format, Logger } from 'winston';
import { TransformableInfo } from 'logform';
import colors from 'colors/safe.js';
import { config } from '../../config/config';

// Define color function type for colors/safe
type ColorFunction = (text: string) => string;

interface Colors {
    [key: string]: ColorFunction;
    grey: ColorFunction;
    red: ColorFunction;
    yellow: ColorFunction;
    green: ColorFunction;
    blue: ColorFunction;
    cyan: ColorFunction;
    white: ColorFunction;
}

interface LevelColors {
    [key: string]: keyof Colors;
}

// Update LogFormat to extend winston's TransformableInfo
interface LogFormat extends TransformableInfo {
    level: string;
    message: string;
    timestamp?: string;
}

export class LoggerHelper {
    public setLogger: Logger;

    constructor(className: string) {
        const levelColors: LevelColors = {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            debug: 'blue',
        };

        const coloredFormat = format.printf((info: LogFormat) => {
            const color = levelColors[info.level] || 'white';
            const levelUpper = info.level.toUpperCase();
            const { level, message, timestamp = new Date().toISOString(), ...metadata } = info;
            
            // Type assertion for colors as Colors type
            const colorLib = colors as unknown as Colors;
            
            let msg = `${colorLib.grey(timestamp)} ${colorLib[color](`[${levelUpper}]`)} ${colorLib.cyan(`[${className}]`)}: ${message}`;
            
            if (Object.keys(metadata).length > 0) {
                msg += ` ${colorLib.grey(JSON.stringify(metadata))}`;
            }
            
            return msg;
        });

        // Create console transport with colored format
        const consoleTransport = new transports.Console({
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
                coloredFormat
            )
        });

        // Create logger with all transports
        this.setLogger = createLogger({
            level: config.logging.level,
            transports: [
                consoleTransport,
            ]
        });
    }
}
