const React = require('react');
const ReactDom = require('react-dom');
const { Component, useState, useRef } = React;

//함수형 컴포넌트
const WordRelay = () => {
    const [word, setWord] = useState('가로수');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length-1] === value[0]){
            setWord(value);
            setValue('');
            setResult('딩동댕');
        }else{
            setResult('땡');
            setValue('');
        }
        inputRef.current.focus();
    };
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input type="text" ref={inputRef} value={value} onChange={onChangeInput} />
                <input type="submit" value="제출" />
            </form>
            <div>{result}</div>
        </>
    );
};
//클래스형 컴포넌트
// class WordRelay extends Component{
//     state = {
//         word : '가로수',
//         value : '',
//         result : '',
//     };
//     onSubmitForm = (e) =>{
//         e.preventDefault();
//         if (this.state.word[this.state.word.length - 1] === this.state.value[0]){
//             this.setState({
//                 result : '딩동댕',
//                 word : this.state.value,
//                 value : '',
//             });
//         }else{
//             this.setState({
//                 result : '땡',
//                 value : '',
//             });
//         }
//         this.input.focus();
//     };
//     onChangeInput = (e) => {
//         this.setState({
//             value : e.target.value
//         });
//     };

//     input;

//     onRefInput = (c) => {
//         this.input = c;
//     }
//     render() {
//         return (
//             <>
//                 <div>{this.state.word}</div>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input type="text" ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
//                     <input type="submit" value="제출" />
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         );
//     }
// }


module.exports = WordRelay;