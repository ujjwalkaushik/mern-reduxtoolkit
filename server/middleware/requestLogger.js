import morgan from "morgan";
import logger from "../utils/logger.js";

// Configure Morgan
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => logger.info(message.trim()), // Log Morgan output with Winston
    },
  }
);

// Custom logger middleware that integrates Morgan
const requestLogger = (req, res, next) => {
  // Call Morgan middleware to log the request details
  morganMiddleware(req, res, () => {});

  // Additional custom logging (e.g., logging IP address)
  res.on("finish", () => {
    logger.info(
      `Method: ${req.method}, URL: ${req.originalUrl}, Status: ${res.statusCode}, IP: ${req.ip}`
    );
  });
  next();
};

export default requestLogger;
