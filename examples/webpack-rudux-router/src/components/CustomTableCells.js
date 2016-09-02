import React from 'react';
import {Cell} from 'rsuite-table';
import { FormattedNumber } from 'react-intl';

export const StatesCell = ({ rowData, dataKey, ...props }) => {
    let clesses = 'icon icon-big ' + (rowData[dataKey] === 'ENABLE' ? 'icon-ok-circle green' : 'icon-info gray');
    return (
        <Cell {...props}>
            <i className={clesses}></i>
        </Cell>
    );
};


export const ObjectCell = ({ rowData = {}, dataKey, ...props }) => {
    let keys = dataKey.split('.');
    keys.map((key) => {
        rowData = rowData[key] || {};
    });
    return (
        <Cell {...props}>
            {(typeof rowData) === 'string' ? rowData : ' ' }
        </Cell>
    );
};

export const NumberCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Cell {...props}>
            <FormattedNumber value={rowData[dataKey]} />
        </Cell>
    );
};

export const LinkCell = ({ rowData, dataKey, ...props }) => {
    return (
        <Cell {...props}>
            <a href={rowData[dataKey]}>{rowData[dataKey]}</a>
        </Cell>
    );
};
