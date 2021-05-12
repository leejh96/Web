import React, { useState, useRef } from 'react';

function InputSample() {
    const [text, setText] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
    };
    const onReset = (e) => {
        setText(''); 
    }

    const [inputs, setInputs] = useState({
        name : '',
        nickname : ''
    });
    const {name, nickname} = inputs;
    const onChange2 = (e)=>{
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name] : value, // inputs[name]= value => 직접 수정x
        });
    };
    const onReset2 = (e) => {
        setInputs({
            name : '',
            nickname : ''
        })
    };


    const [inputs2, setInputs2] = useState({
        name1 : '',
        nickname1 : ''
    });
    const nameInput = useRef();
    const {name1, nickname1} = inputs2; // "", ""
    const onChange3 = (e) =>{
        const {value, name} = e.target; // {value : asd, name : name1},
                                        // {value : bsd, name : nickname1}
        setInputs2({
            ...inputs2,
            [name] : value,
        });
    };
    const onReset3 = (e) => {
        setInputs2({
            name1 : "",
            nickname1 : "",
        })
        nameInput.current.focus();
    };

    return (
        <>
            <div>
                <input onChange={onChange} />
                <button onClick={onReset}>초기화</button>
                <div>
                    <b>값 : {text}</b>
                </div>
            </div>

            <div>
                <input name = "name" onChange={onChange2} placeholder="이름" value={name}/>
                <input name = "nickname" onChange={onChange2} placeholder="닉네임" value={nickname}/>
                <button onClick={onReset2}>초기화</button>
                <div>
                    <b>값 : </b>
                    {name} ({nickname})
                </div>
            </div>

            <div>
            <input
                name="name1"
                placeholder="이름"
                onChange={onChange3}
                value={name1}
                ref={nameInput}
            />
            <input
                name="nickname1"
                placeholder="닉네임"
                onChange={onChange3}
                value={nickname1}
            />
            <button onClick={onReset3}>초기화</button>
            <div>
                <b>값: </b>
                {name1} ({nickname1})
            </div>
            </div>
        </>
    );
}

export default InputSample;