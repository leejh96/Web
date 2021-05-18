import React, {Component , useState} from 'react';
import Try from './try.jsx';
function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const arr =[];
    for (let i = 0; i< 4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() *(9-i)), 1)[0];
        arr.push(chosen);
    }
    return arr;
}

//함수형 컴포넌트
const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onChangeInput = (e) => {
        return setValue(e.target.value);
    };
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런');
            setTries((prevTries) => [...prevTries, {try : value, result : '홈런'}]);
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        }else{
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){
                setResult(`10번 넘게 틀려서 실패!  답은 ${answer.join(',')} 였습니다.`);
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            }else{
                for (let i = 0; i< 4; i++){
                    if(answerArray[i] === answer[i]){
                        strike += 1;
                    }else if(answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setTries((prevTries) => [...prevTries, {try : value , result : `${strike}스트라이크, ${ball}볼 입니다.` }]);
                setValue('');
            }
        }
    };
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength= {4} value={value} onChange={onChangeInput}/>
                <button type="submit">제출</button>
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={i} tryInfo={v}/>
                    )
                })}
            </ul>
        </>
    )
};

//클래스형 컴포넌트
// class NumberBaseball extends Component{

//     state = {
//         result : '',
//         value : '',
//         answer : getNumbers(),
//         tries : [],
//     }

//     onSubmitForm = (e) => {
//         e.preventDefault();
//         if(this.state.value === this.state.answer.join('')){
//             this.setState({
//                 result : '홈런!',
//                 value : '',
//                 tries : [...this.state.tries, {try: this.state.value, result : '홈런!'}]
//             })
//             alert('게임을 다시 시작합니다.');
//             this.setState({
//                 value : '',
//                 answer : getNumbers(),
//                 tries : [],
//             });
//         }else{
//             const answerArray = this.state.value.split('').map((v) => parseInt(v));
//             let strike = 0;
//             let ball = 0;
//             if(this.state.tries.length >= 9){
//                 this.setState({
//                     result : `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다.`
//                 })
//                 alert('게임을 다시 시작합니다.');
//                 this.setState({
//                     value : '',
//                     answer : getNumbers(),
//                     tries : [],
//                 });
//             }else{
//                 for (let i = 0; i< 4; i++){
//                     if(answerArray[i] === this.state.answer[i]){
//                         strike += 1;
//                     }else if(this.state.answer.includes(answerArray[i])){
//                         ball += 1;
//                     }
//                 }
//                 this.setState({
//                     tries : [...this.state.tries, {try : this.state.value , result : `${strike}스트라이크, ${ball}볼 입니다.` }],
//                     value : '',
//                 })
//             }


//         }
//     };
//     onChangeInput = (e) => {
//         this.setState({
//             value : e.target.value
//         })
//     };

//     render(){
//         return (
//             <>
//                 <h1>{this.state.result}</h1>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input maxLength= {4} value={this.state.value} onChange={this.onChangeInput}/>
//                     <button type="submit">제출</button>
//                 </form>
//                 <div>시도 : {this.state.tries.length}</div>
//                 <ul>
//                     {this.state.tries.map((v, i) => {
//                         return (
//                             <Try key={i} tryInfo={v}/>
//                         )
//                     })}
//                 </ul>
//             </>
//         )
//     }
// }
export default NumberBaseball;