import React,  { Component } from "react";
import NumberBaseball from '../숫자야구/numberBaseball';
import RockScissorsPaper from '../가위바위보/rockscissorspaper';
import Lotto from '../로또추첨기/lotto';

class GameMatcher extends Component{
    render(){
        if(this.props.match.params.name === 'number-baseball'){
            return <NumberBaseball />;
        }
        else if(this.props.match.params.name === 'rock-scissors-paper'){
            return <RockScissorsPaper />;
        }
        else if(this.props.match.params.name === 'lotto-generator'){
            return <Lotto />;
        }
        return (
            <div>
                일치하는 게임이 없습니다.
            </div>
        );
    }
}
export default GameMatcher;