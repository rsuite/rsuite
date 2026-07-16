import ReactDOM from 'react-dom';

const majorVersion = parseInt(ReactDOM.version);

/**
 * Force React to flush any updates inside the provided callback synchronously.
 * This ensures that the DOM is updated immediately.
 */
const flushSync = callback => {
  if (majorVersion >= 18) {
    ReactDOM.flushSync?.(callback);
    return;
  }
  callback();
};

export default flushSync;
