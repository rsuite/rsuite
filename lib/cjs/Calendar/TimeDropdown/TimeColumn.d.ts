import React from 'react';
interface TimeColumnProps {
    prefix: (name: string) => string;
    title: React.ReactNode;
    children: React.ReactNode;
}
declare const TimeColumn: (props: TimeColumnProps) => React.JSX.Element;
export default TimeColumn;
