// import debug_modul from 'debug';

const LogLevMatch = {
  log: 0,
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
};
const LogLevMsgPrefixMatch = {
  log: ['log:->%c%s', 'backgroundColor: blue'],
  trace: ['trace:->%c%s', 'backgroundColor: blue'],
  debug: ['debug:->%c%s', 'backgroundColor: blue'],
  info: ['info:->%c%s', 'backgroundColor:green'],
  warn: ['warn:->%c%s', 'backgroundColor:yellow'],
  error: ['error:->%c%s', 'font-size: x-large'],
  fatal: ['fatal:->%c%s', 'font-size: x-large']
};

class Logger {

  constructor() {
    this.lev = LogLevMatch.trace;
    this.enable = false;
    // this.loggers = this._initLoggers();
  }

  // _initLoggers() {
  //   const loggers = {};
  //   for (const oneKey in LogLevMatch) {
  //     if (LogLevMatch.hasOwnProperty(oneKey)) {
  //       const oneLogger = debug_modul(oneKey);
  //       if (typeof console[oneKey] !== 'undefined') {
  //         oneLogger.log = console[oneKey].bind(console);
  //       } else {
  //         oneLogger.log = console.log.bind(console);
  //       }
  //       oneLogger.enabled = true;
  //       loggers[LogLevMatch[oneKey]] = oneLogger;
  //     }
  //   }
  //   return loggers;
  // }

  _getLogger(logType) {
    if (this.enable && this.lev <= LogLevMatch[logType]) {
      if (typeof console[logType] !== 'undefined') {
        return console[logType].bind(console, ...LogLevMsgPrefixMatch[logType]);
      } else {
        return console.log.bind(console, ...LogLevMsgPrefixMatch[logType]);
      }
    }
    return () => {
    };
  }

  // log() {
  //   if (this.enable && this.lev <= LogLevMatch.trace) this.loggers[LogLevMatch.trace](...arguments);
  // }
  //
  // trace() {
  //   if (this.enable && this.lev <= LogLevMatch.trace) this.loggers[LogLevMatch.trace](...arguments);
  // }
  //
  // debug() {
  //   if (this.enable && this.lev <= LogLevMatch.debug) this.loggers[LogLevMatch.debug](...arguments);
  // }
  //
  // info() {
  //   if (this.enable && this.lev <= LogLevMatch.info) this.loggers[LogLevMatch.info](...arguments);
  // }
  //
  // warn() {
  //   if (this.enable && this.lev <= LogLevMatch.warn) this.loggers[LogLevMatch.warn](...arguments);
  // }
  //
  // error() {
  //   if (this.enable && this.lev <= LogLevMatch.error) this.loggers[LogLevMatch.error](...arguments);
  // }
  //
  // fatal() {
  //   if (this.enable && this.lev <= LogLevMatch.fatal) this.loggers[LogLevMatch.fatal](...arguments);
  // }

  setEnable(enable) {
    this.enable = enable;
  }

  setLevel(level) {
    this.lev = LogLevMatch[level];
  }
}

const runLogger = new Logger();
runLogger.setEnable(true);

for (const oneKey in LogLevMatch) {
  if (LogLevMatch.hasOwnProperty(oneKey)) {
    Object.defineProperty(runLogger, oneKey, {
      get: () => {
        const func = runLogger._getLogger(oneKey);
        return func;
      }
    });
  }
}
export default runLogger;