import React, { useState, useReducer} from 'react';

function reducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }

function Counter(){
    const [number, setNumber] = useState(100);
    const onIncrease = () =>{
        setNumber(prevNumber => prevNumber + 1);
    };
    const onDecrease = () =>{
        setNumber(prevNumber => prevNumber - 1);
    }

    //state : 앞으로 컴포턴트에서 사용할 수 있는 상태를 가리킴
    //dispatch : 액션을 발생시키는 함수
    //reducer : 현재 상태와 액션 객체를 받아와서 새로운 상태를 반환해주는 함수
    //initialState : 초기 상태 
    const [state, dispatch] = useReducer(reducer, /*initialState*/ 0);
    const onIncrease1 = () => {
        dispatch({ type: 'INCREMENT' });
    };
    const onDecrease1 = () => {
        dispatch({ type: 'DECREMENT' });
    };
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
            <h1>{state}</h1>
            <button onClick={onIncrease1}>+1</button>
            <button onClick={onDecrease1}>-1</button>

        </div>
    )
}
export default Counter