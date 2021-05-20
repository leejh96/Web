import React, { Component,useState, useRef, useEffect } from 'react';
const rspCoords = {
    rock : '0',
    scissor : '-142px',
    paper : '-284px'
}
const scores = {
    scissor : 1,
    rock : 0,
    paper : -1,
}
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0];
};

//함수형 컴포넌트
const rockScissorsPaper = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.rock);
    const [score, setScore] = useState(0);
    const interval = useRef(null);

    //componentDidMount, componentDidUpdate 역할을 할 수 있음
    // 두번째 파라미터가 클로저 문제 같은걸 해결해줌
    // 두번째 파라미터에 useEffect를 실행하고 싶은 state를 넣어주면 된다.
    // 두번째 파라미터에 값이 바뀔 때마다 useEffect가 실행된다.
    // 두번째 파라미터가 비어있다면 한번만 실행하고 그뒤로는 실행 안된다.
    // useEffect 여러번 사용 가능, 각기 다른 이벤트를 주고 싶을때
    useEffect(() => {
        interval.current = setInterval(changeHand, 100);
        return () => { //componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord]);
    const onClickBtn = (value) => () => {
        clearInterval(interval.current);
        const myScore = scores[value];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0){
            setResult('비겼습니다.');
        }else if ([-1, 2].includes(diff)){
            setScore((prevScore) => {
                return prevScore + 1;
            });
            setResult('이겼습니다.')
        }else{
            setScore((prevScore) => {
                return prevScore - 1;
            });
            setResult('졌습니다.');
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 1000)
    };
    const changeHand = () => {       
        if(imgCoord === rspCoords.rock){
            setImgCoord(rspCoords.scissor);
        }else if(imgCoord === rspCoords.scissor){
            setImgCoord(rspCoords.paper);
        }else{
            setImgCoord(rspCoords.rock);
        }
    };
    return (
        <>
            <div id="computer" style ={{background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
            <div>
                <button id="scissor"className="btn" onClick={onClickBtn('scissor')}>가위</button>
                <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
                <button id="paper"className="btn" onClick={onClickBtn('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 : {score}점</div>
        </>
    );
};
// 실행순서 (클래스)
// constructor -> render -> ref -> componentDidMount ->
// setState나 prop변경 시 -> shouldComponentUpdate(true 일경우, 리렌더링 할지말지 정하는 부분)
// -> rerender -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount

// 클래스형 컴포넌트
// class rockScissorsPaper extends Component{
//     state = {
//         result : '',
//         imgCoord : 0,
//         score : 0,
//     };
//     interval;
//     changeHand = () => {
//         const {imgCoord} = this.state; //비동기함수 이기때문에 밖에다 선언하면 클로저문제가 발생
//         if(imgCoord === rspCoords.rock){
//             this.setState({
//                 imgCoord: rspCoords.scissor,
//             });
//         }else if(imgCoord === rspCoords.scissor){
//             this.setState({
//                 imgCoord: rspCoords.paper
//             });
//         }else{
//             this.setState({
//                 imgCoord : rspCoords.rock
//             })
//         }
//     }
// react가 jsx를 dom에 붙여주는 순간에 특정한 동작을 할 수있다.
// render가 처음 실행되고난 후 에는 componentDidMount가 실행되고 리렌더링 될때는 실행 x
// 비동기 요청을 많이 쓴다. setInterval 등등
//     componentDidMount(){
//         this.interval = setInterval(this.changeHand, 100);
//     }

//     //리랜더링 후에는 componentDidUpdate를 실행
//     // componentDidUpdate(){

//     // }

//     //부모가 자식의 컴포넌트를 제거되기 직전에 사용하는 경우에도 사용하고
//     //componentDidMount에서의 작업을 제거하는 경우에도 사용한다.
//     //비동기 요청을 정리할 때 쓰인다 clearInterval 등등
//     componentWillUnmount(){
//         clearInterval(this.interval);
//     }

//     // onClick 메소드에 () => this.onClickBtn('scissor')는
//     // onClickBtn = (value) => () => {}과 같다 (고차함수 개념) 
//     // 원래 onClick 메소드에는 e가 디포트 파라미터로 들어있기 때문에 다른 파라미터를
//     // 넣어주기 위해서는 다음과 같이 사용하게 된다. 넣을 파라미터가 없다면 그냥 화살표
//     // 함수로도 실행할 수 있다.
//     onClickBtn = (value) => () => {
//         const { imgCoord } = this.state;
//         clearInterval(this.interval);
//         const myScore = scores[value];
//         const cpuScore = scores[computerChoice(imgCoord)];
//         const diff = myScore - cpuScore;
//         if (diff === 0){
//             this.setState({
//                 result: '비겼습니다.',
//             });
//         }else if ([-1, 2].includes(diff)){
//             this.setState((prevState) => {
//                 return {
//                     result : '이겼습니다.',
//                     score : prevState.score + 1,
//                 };
//             });
//         }else{
//             this.setState((prevState) => {
//                 return {
//                     result : '졌습니다.',
//                     score : prevState.score - 1,
//                 };
//             });
//         }
//         setTimeout(() => {
//             this.interval = setInterval(this.changeHand, 100);
//         }, 1000)
//     };
    
//     //render함수에서는 setState를 쓰면 무한 렌더링이 되기 때문에 사용하면 안된다.
//     render(){
//         const { result, score, imgCoord } = this.state
//         return (
//             <>
//                 <div id="computer" style ={{background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
//                 <div>
//                     <button id="scissor"className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
//                     <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
//                     <button id="paper"className="btn" onClick={this.onClickBtn('paper')}>보</button>
//                 </div>
//                 <div>{result}</div>
//                 <div>현재 : {score}점</div>
//             </>
//         )
//     }
// }

export default rockScissorsPaper;