import React, { useCallback, useEffect, useReducer } from 'react';
import Table from './table'

//state들의 초기값
const initialState = {
    winner : '',
    turn : 'O',
    tableData : [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell : [-1,-1],
};

//dispatch안에 action들을 실행 시키는 함수
const reducer = (state, action) =>{
    switch (action.type){
        case 'SET_WINNER':
            //불변성을 지키기위해서 ...state를 사용
            return {
                ...state,
                winner : action.winner,
            };
        case 'CLICK_CELL':
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell : [action.row, action.cell],   
            };
        case 'SET_TURN':
            return {
                ...state,
                turn : state.turn === 'O' ? 'X':'O',
            };
        case 'RESET_GAME':
            return {
                ...state,
                turn : 'O',
                tableData : [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell : [-1,-1],
            };
        default:
            return state;
    }
}
const TTT = () => {
//     const [winner, setWinner] = useState('');
//     const [turn, setTurn] = useState('O');
//     const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
    
// useReducer는 각각의 state들을 다 useState하면 값을 자식으로 넘겨줄 때 문제가 있어서
// 각각의 state를 다 선언하지 않고 initialState에 초기값을 한번에 넣어 reducer로 관리한다.
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;
    const onClickTable = useCallback(() => {
        // dispatch 안의 들어가는 것은 action이고 dispatch는 이 action을 실행
        dispatch({ type : 'SET_WINNER', winner : 'O'})
    }, []);
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0){
            return ;
        }
        let win = false;
        if( tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2]=== turn){
            win = true;
        }
        if( tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell]=== turn){
            win = true;
        }
        if( tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2]=== turn){
            win = true;
        }
        if( tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0]=== turn){
            win = true;
        }
        if (win){
            dispatch({type : 'SET_WINNER', winner : turn});
            dispatch({type : 'RESET_GAME'});
        }else{
            let all = true;
            tableData.forEach((row)=>{
                row.forEach((cell)=> {
                    if(!cell){
                        all = false;
                    }
                });
            });
            if(all){
                dispatch({type : 'RESET_GAME'});
            }else{
                dispatch({type : 'SET_TURN'});
            }
        }
    },[recentCell])
    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
};

export default TTT;