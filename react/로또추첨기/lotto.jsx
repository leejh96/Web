import React, { Component, useState, useRef, useEffect, useMemo } from 'react';
import Ball from './ball';
function getWinNumbers(){
    const candidate = Array(45).fill().map((v,i) => i+1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const WinNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
    return  [...WinNumbers, bonusNumber];
}

const Lotto = () => {
    // 만약 getWinNumbers 함수가 10초이상 걸린다면 useState에 바로 넣어줄 때
    // 렌더링마다 계속 실행되므로(함수형 컴포넌트는 리렌더링시 전부 재시작)
    // useMemo를 사용하여 값을 저장해둔다.
    // 두번째 인자의 값이 바뀌지 않는 한 다시 실행되지 않는다.
    // 값을 저장해둔다는 것에서 useRef와 비슷하지만 useMemo는 복잡한 함수값을 기억
    // useRef 는 일반 값을 기억하는데 사용한다.
    const lottoNumbers = useMemo(() => getWinNumbers(), [])
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    
    //두번째 파라미터가 비어있다면 componentDidMount와 같다.
    //파라미터가 있다면 componentDidMount와 componentDidUpdate 둘다 수행
    
    const runTimeouts = () => {
        for (let i = 0; i< winNumbers.length - 1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevWinBalls)=>{
                    return [...prevWinBalls, winNumbers[i]];
                });
            }, (i + 1)*1000);
        }
        timeouts.current[winNumbers.length-1] = setTimeout(()=> {
            setBonus(winNumbers[winNumbers.length-1]);
            setRedo(true);
        }, winNumbers.length* 1000);
    }
    
    useEffect(() => {
        runTimeouts();
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v)
            })
        }
    },[timeouts.current])
    const onClickRedo = () => {
            setWinNumbers(getWinNumbers()); // 당첨 숫자
            setWinBalls([]);
            setBonus(null); // 보너스 숫자
            setRedo(false);
            timeouts.current = [];
        }


    return (
        <>
            <div>당첨 숫자</div>
            <div id="result">
                {winBalls.map((v)=> <Ball key = {v} number={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number= {bonus} />}
            {redo &&<button onClick = {onClickRedo}>한 번 더</button>}
        </>
    )
}

//클래스형 컴포넌트
// class Lotto extends Component{
//     state =  {
//         WinNumbers :  getWinNumbers(), // 당첨 숫자
//         winBalls : [],
//         bonus : null, // 보너스 숫자
//         redo: false,
//     };
//     timeouts = [];
//     runTimeouts = () => {
//         const { WinNumbers, winBalls, redo } = this.state;
//         for (let i = 0; i< this.state.WinNumbers.length - 1; i++){
//             this.timeouts[i] = setTimeout(() => {
//                 this.setState((prevState)=>{
//                     return {
//                         winBalls : [...prevState.winBalls, WinNumbers[i]],
//                     };
//                 });
//             }, (i + 1)*1000);
//         }
//         this.timeouts[WinNumbers.length-1] = setTimeout(()=> {
//             this.setState({
//                 bonus : WinNumbers[WinNumbers.length-1],
//                 redo : true,
//             });
//         }, 7000);
//     }
//     componentDidMount() {
//         this.runTimeouts();
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.winBalls.length === 0){
//             this.runTimeouts();
//         }
//     }
//     componentWillUnmount() {
//         this.timeouts.forEach((v) => {
//             clearTimeout(v);
//         });
//     }
//     onClickRedo = () => {
//         this.setState({
//             WinNumbers :  getWinNumbers(), // 당첨 숫자
//             winBalls : [],
//             bonus : null, // 보너스 숫자
//             redo: false,
//         })
//         this.timeouts = [];
//     };
//     render(){
//         const { winBalls, bonus, redo } = this.state;
//         return (
//             <>
//                 <div>당첨 숫자</div>
//                 <div id="result">
//                     {winBalls.map((v)=> <Ball key = {v} number={v} />)}
//                 </div>
//                 <div>보너스</div>
//                 {bonus && <Ball number= {bonus} />}
//                 {redo &&<button onClick = {this.onClickRedo}>한 번 더</button>}
//             </>
//         )
//     }
// }

export default Lotto;