import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import Form from './form';
import Table from './table';

export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    CLICKED_MINE : -6,
    OPENED : 0, //0이상이면 다 opened
};
//자식 컴포넌트들에 어떤 값을 넘겨줘야 할 때 자식의 자식의 자식 이런식으로 넘기지 않기 위해
//contextAPI를 사용한다.
//contextAPI 설정, 초기값 설정가능
//다른 파일에서 사용할 수 있도록 export해준다.
export const TableContext = createContext({
    tableData : [],
    dispatch : () => {},
    halted : true,
});
const initialState = {
    tableData : [],
    data : {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer : 0,
    result : '',
    halted : true,
    openedCount : 0,
}
const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((arr, i)=>{
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random()* candidate.length), 1)[0]
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i<row; i++){
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j<cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }
    for (let k = 0; k<shuffle.length; k++){
        const ver = Math.floor(shuffle[k]/ cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};
const reducer = (state, action) => {
    switch(action.type){
        case 'START_GAME' :
            return {
                ...state,
                data : {
                    row : action.row,
                    cell : action.cell,
                    mine : action.mine
                },
                openedCount : 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted : false,
                timer: 0,
            };
        case 'OPEN_CELL': {
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;
            const checkAround = (row, cell) => {
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])){
                    //닫힌 칸만 열기
                    return;
                }
                if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length){
                    //상 하 좌 우 에 없는 칸은 안 열기
                    //위 아래만 검사하는 이유는 좌우는 없으면 알아서 undefined가 되어 filter에서 걸러줌
                    return ;
                }
                if(checked.includes(row + ',' +cell)){
                    // 한 번 연칸은 무시하기
                    return;
                }else {
                    checked.push(row + ',' +cell);
                }
                let around = [
                    tableData[row][cell - 1], tableData[row][cell + 1],
                ];
                if(tableData[row -1]){
                    around = around.concat(
                        tableData[row -1][cell -1],
                        tableData[row -1][cell],
                        tableData[row -1][cell +1]
                    );
                }
                if(tableData[row + 1]){
                    around = around.concat(
                        tableData[row + 1][cell -1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell +1]
                    );
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                if(count === 0){
                    if(row > -1){
                        const near = [];
                        if( row - 1 > -1){
                            near.push([row-1, cell-1]);
                            near.push([row-1, cell]);
                            near.push([row-1, cell+1]);
                        }
                        near.push([row, cell-1]);
                        near.push([row, cell+1]);
                        if(row + 1 > tableData.length) {
                            near.push([row+1, cell-1]);
                            near.push([row+1, cell]);
                            near.push([row+1, cell+1]);
                        }
                        near.forEach((n) => {
                            if(tableData[n[0]][n[1]] !== CODE.OPENED){
                                checkAround(n[0], n[1]);
                            }
                        });
                    }
                }
                if(tableData[row][cell] === CODE.NORMAL){
                    // 내 칸이 닫힌 칸이면 카운트
                    openedCount += 1
                }
                tableData[row][cell] = count;
            };
            checkAround(action.row, action.cell)
            let halted = false;
            let result = '';
            if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
                //승리
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다.`;
            }
            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result,
            };
        }
        case 'CLICK_MINE': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted : true,
            };
        }
        case 'FLAG_CELL': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case 'QUESTION_CELL': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case 'NORMALIZE_CELL': {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        case 'INCREMENT_TIMER':
            return {
                ...state,
                timer : state.timer + 1,
            }
        default :
            return state;
    }
};
const MineSearch = () => {
    const  [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;
    const value = useMemo(() => ({
        tableData,
        dispatch,
        halted,
        //dispatch는 절대 바뀌지 않기 때문에 []안에 넣을 필요없다.
    }), [tableData, halted]);

    useEffect(() => {
        let timer;
        if(halted === false){
            timer = setInterval(() => {
                dispatch({type : 'INCREMENT_TIMER'});
            }, 1000);
            return () => {
                clearInterval(timer);
            }
        }
    }, [halted])
    return (
        //contextAPI를 사용할 자식 컴포넌트들을 createContext로 설정한 변수의
        //provider를 통해 묶어주고 value를 설정해주면 자식컴포넌트들은 value로
        //설정한 데이터들을 사용할 수 있다.
        //value에 직접 값을 넣게되면 값이 리랜더링 될때마다 계속 생기기 때문에
        //useMemo를 사용하여 캐쉬화 시켜줘야한다.
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};
export default MineSearch;