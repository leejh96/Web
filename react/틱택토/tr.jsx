import React, {useMemo} from 'react';
import Td from './td';

const Tr = ({rowData, rowIdx, dispatch}) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (
                useMemo(() => <Td key={i} rowIdx={rowIdx} cellIdx={i} cellData={rowData[i]} dispatch={dispatch}>{''}</Td>, [rowData[i]])
            ))}
        </tr>
    );
};
export default React.memo(Tr);