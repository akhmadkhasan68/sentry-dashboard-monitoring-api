import { NextFunction, Request, Response } from "express";
import { LoggerHelper } from "../logger/logger";

// Interface for extended request object with custom properties
interface ExtendedRequest extends Request {
    requestId?: string;
    startTime?: number;
}

// Generate unique request ID
const generateRequestId = (): string => {
    return Math.random().toString(36).substring(7);
};

export const loggingMiddleware = (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    // Add request ID and start time
    req.requestId = generateRequestId();
    req.startTime = Date.now();

    const logger = new LoggerHelper('RequestLogger');

    // Log request details
    logger.setLogger.info("Incoming request", {
        type: 'request',
        requestId: req.requestId,
        method: req.method,
        path: req.path,
        query: req.query,
        headers: req.headers,
        body: req.body,
        ip: req.ip
    });

    // Capture response using response event listeners
    res.on('finish', () => {
        const duration = Date.now() - (req.startTime || 0);
        
        logger.setLogger.info("Outgoing response", {
            type: 'response',
            requestId: req.requestId,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            headers: res.getHeaders()
        });
    });

    next();
};
