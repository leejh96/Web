import React from 'react';
import Tr from './tr';

const Table = ({ tableData, dispatch }) => {
    return (
        <table>
            {Array(tableData.length).fill().map((tr, i) => (
                <Tr key={i} rowIdx={i} rowData={tableData[i]} dispatch={dispatch}/>
            ))}
        </table>
    )
};

export default Table;