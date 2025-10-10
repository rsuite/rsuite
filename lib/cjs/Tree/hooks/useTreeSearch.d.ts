import React from 'react';
interface TreeSearchProps<T> {
    searchKeyword?: string;
    data: T[];
    searchBy?: (keyword: any, label: any, item: any) => boolean;
    callback?: (keyword: string, data: T[], event: React.SyntheticEvent) => void;
}
/**
 * Custom hook for searching and filtering data in a tree structure.
 */
export default function useTreeSearch<T>(props: TreeSearchProps<T>): {
    keyword: string;
    filteredData: T[];
    setFilteredData: (data: T[], searchKeyword: string) => void;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: (searchKeyword: string, event?: React.ChangeEvent) => void;
};
export {};
