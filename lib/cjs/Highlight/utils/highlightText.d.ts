import React from 'react';
export declare function highlightText(text: string, props: {
    query?: string | string[];
    renderMark: (patch: string, index: number) => React.ReactNode;
}): string | React.ReactNode[];
