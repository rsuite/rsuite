export declare function useMap<K, V>(): {
    has(key: K): boolean;
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    clear(): void;
};
export default useMap;
