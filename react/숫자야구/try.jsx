import React, { Component, memo } from 'react';

// class Try extends Component{
//     render(){
//         return (
//             <li>
//                 <div>{this.props.tryInfo.try} => {this.props.tryInfo.result}</div>
//             </li>
//         )
//     }
// }
//{tryInfo} 를  props 하기도 한다.
const Try = ({ tryInfo }) => {
    console.log('렌더링')
    return (
        <li>
            <div>{tryInfo.try} => {tryInfo.result} </div>
        </li>
    )
}

export default memo(Try);