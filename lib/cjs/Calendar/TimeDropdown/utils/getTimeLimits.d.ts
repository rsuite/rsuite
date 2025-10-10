interface TimeRange {
    start: number;
    end: number;
}
interface TimeLimits {
    hours: TimeRange;
    minutes: TimeRange;
    seconds: TimeRange;
}
export declare function getTimeLimits(isMeridiem: boolean): TimeLimits;
export {};
