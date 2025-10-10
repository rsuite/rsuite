export declare const KEY_GROUP_TITLE = "groupTitle";
export declare function getDataGroupBy<T>(data: readonly T[], key: string, sort?: (isGroup: boolean) => <T>(a: T, b: T) => number): (T | {
    groupTitle: string;
    children: T[];
})[];
export default getDataGroupBy;
