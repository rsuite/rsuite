export declare function transformData(data: any[]): any[];
export declare const shouldDisplay: <TItem extends {
    label: string;
}>(filterBy: ((value: string, item: TItem) => boolean) | undefined, value: string) => (item: TItem) => boolean;
