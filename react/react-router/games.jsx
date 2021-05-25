import React from 'react';
import { BrowserRouter, HashRouter, Link, Route, Switch } from 'react-router-dom';
import GameMatcher from './gameMatcher';
// 3. You might have more than one copy of React in the same app 
// 위와 같은 에러가 나는 이유는 현재 폴더에 react와 불러올 컴포넌트에서 선언된
// react가 다르기 때문에 나온다. 따라서 클래스로 불러오면 해결된다.

const Games = () => {
    return (
        <BrowserRouter>
            {/* react에서는 a태그 대신 Link태그를 사용하고 
            to 를 이용하여 a태그의 href효과를 낸다. a태그를 사용하면 에러 */}
            <Link to = '/game/number-baseball'>숫자야구</Link>
            &nbsp;
            <Link to = '/game/rock-scissors-paper'>가위바위보</Link>
            &nbsp;
            <Link to = '/game/lotto-generator'>로또추첨기</Link>
            &nbsp;
            <Link to = '/game/index'>게임매쳐</Link>

            <div>
                {/* Switch를 사용하면 여러개의 페이지가 렌더링 되는것을 첫번째 나오는 페이지만 렌더링 되도록 해준다. 
                    ex) <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                        <Route path="/game/number-baseball" render={(props) => <GameMatcher {...props} />} />
                        이런식이면 두개가 랜더링되지만 switch로 감싸면 위에 :name만 뜬다
                */}
                {/* 
                     exact 는 주소가 완전히 일치하는 것만 렌더링 되도록 하는것으로
                     Switch를 사용할 때 exact가 없다면  / 와 /game/number-baseball이 같다고 생각하기 때문에
                     (React에서만 이런식)
                     완전히 같은 주소를 원한다면 exact를 붙인다
                    ex) <Route exact path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                */}
                <Switch>
                    {/* path는 페이지 이름, component는 불러올 파일 */}
                    {/* <Route path="/game/:name" component={GameMatcher}></Route> */}

                    {/* props 넘겨주는 법 */}
                    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                </Switch>
            </div>
        </BrowserRouter>
    )
};
export default Games;