import React, {Component, useRef, useState} from 'react';

//함수형 컴포넌트
const ReactionSpeed = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    //useRef는 항상 current로 접근하여 저장하던지 불러오던지 한다.
    let timeOut = useRef(null); //useState는 렌더링을 하지만 useRef는 렌더링되지 않는다.
    let startTime = useRef();
    let endTime = useRef();
    const onClickScreen = () => {

        if(state === 'waiting'){
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            //여기는 렌더링되지 않고 값만 변하게된다
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date()   
            },Math.floor(Math.random() * 1000)+2000)
        }else if(state === 'ready'){
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('이런 성급하셨군요!');
        }else if(state === 'now'){
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult,  endTime.current - startTime.current];
            });
        }

    }
    const onReset = () => {
        setState([]);
    }
    const renderAverage = () => {
        return result.length === 0 ? 
        null : 
        <>
            <div>평균 시간 : {result.reduce((a,c) => a+c) / result.length}ms</div>
            <button onClick={onReset}>리셋</button>
        </>
    }
    return (
        <>
            <div
                id="screen"
                className = {state}
                onClick = {onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    );
};

//클래스형 컴포넌트
// class ReactionSpeed extends Component {
//     state = {
//         state : 'waiting',
//         message : '클릭해서 시작하세요',
//         result : []
//     };
//     timeout;
//     startTime;
//     endTime;

//     onClickScreen = () => {
//         const {state, message, result} = this.state;
//         if(state === 'waiting'){
//             this.setState({
//                 state : 'ready',
//                 message : '초록색이 되면 클릭하세요.',
//             })
//             this.timeout = setTimeout(()=> {
//                 this.setState({
//                     state : 'now',
//                     message : '지금 클릭',
//                 });
//                 this.startTime =  new Date();
//             }, Math.floor(Math.random() * 1000)+2000);
//         }else if(state === 'ready'){
//             clearTimeout(this.timeout);
//             this.setState({
//                 message : '이런 성급하셨군요!',
//                 state : 'waiting',
//             })
//         }else if(state === 'now'){
//             this.endTime = new Date();
//             this.setState((prevState) =>{
//                 return {
//                     state : 'waiting',
//                     message : '클릭해서 시작하세요',
//                     result : [...prevState.result, this.endTime - this.startTime],
//                 };
//             });
//         }
//     };
//      onReset = () => {
//          this.setState({
//              result : [],
//          });
//      };
//     renderAverage = () => {
//         const {result} = this.state;
//         return ( 
//             result.length === 0 
//             ? null
//             : <>
//               <div>평균 시간 : {this.state.result.reduce((a,c) => a+c) / this.state.result.length}ms</div>
//               <button onClick={this.onReset}>리셋</button>
//          
//               </>
//              )
//     }
//     render(){
//         return (
//             <>
//                 <div
//                     id="screen"
//                     className = {this.state.state}
//                     onClick = {this.onClickScreen}
//                 >
//                     {this.state.message}
//                 </div>
//                 {this.renderAverage()}
//             </>
//         );
//     }
// }

export default ReactionSpeed;