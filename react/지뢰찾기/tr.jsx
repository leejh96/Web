import React, {useContext, useMemo} from 'react';
import { TableContext } from './mineSearch';
import Td from './td';

const Tr = ({rowIdx}) => {
    const { tableData } = useContext(TableContext);

    return (
        <tr>
            { tableData[0] && Array(tableData[0].length).fill().map((td, i) => <Td rowIdx ={rowIdx} cellIdx = {i} />)}
        </tr>
    );
};
export default React.memo(Tr);
