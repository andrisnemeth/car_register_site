import pino, { DestinationStream, Level, Logger, LoggerOptions } from "pino";
import pretty from "pino-pretty";

const env = process.env.NODE_ENV;

function getLogLevel() {
  if (env === "test") {
    return "debug";
  }

  if (env === "development" && process.env.LOG_LEVEL !== undefined) {
    return process.env.LOG_LEVEL;
  }

  return "info";
}

const options = {
  level: getLogLevel(),
};

const logger =
  env === "test" || env === "development"
    ? pino(options, pretty({ colorize: true, sync: env === "test" }))
    : pino(options);

export default logger;
