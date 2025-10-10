/**
 * Logs a warning message
 * but dont warn a same message twice
 */
export declare function warnOnce(message: string): void;
export declare namespace warnOnce {
    var _resetWarned: () => void;
}
export default warnOnce;
