import React from 'react';

function Hello({name , color,  isSpecial}){
    return (
        <>
            {isSpecial ? <b>*</b> : null}
            <div>안녕하세요</div>
            <div>{name}</div>
            <div style={{color}}>{color}</div>
        </>
    )
}
Hello.defaultProps = {
    name : '이름없음'
}
export default Hello;
