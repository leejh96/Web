import React, { useCallback } from 'react';

const Td = ({rowIdx, cellIdx, dispatch, cellData}) => {
    const onClickTd = useCallback(() => {
        if (cellData){
            return;
        }
        dispatch({type : 'CLICK_CELL', row : rowIdx, cell : cellIdx});
    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
};
export default React.memo(Td);