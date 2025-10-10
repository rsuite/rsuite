/**
 * Copy the time from one date to another.
 *
 * @param from - The source date.
 * @param to - The target date.
 * @returns The target date with the time copied from the source date.
 */
export declare function copyTime({ from, to }: {
    from: Date;
    to: Date;
}): Date;
export default copyTime;
