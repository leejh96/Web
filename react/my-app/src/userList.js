import React, {useEffect} from 'react';

function User({ user, onRemove, onToggle }){
    // deps의 값이 비었을 경우
    useEffect(()=>{
        console.log('컴포넌트가 화면에 나타남');

        //cleanup 함수
        //deps라 불리는 useEffect의 두번째 파라미터의 값이 비었을 경우 컴포넌트가 사라질 때 호출
        return () => { 
            console.log('컴포넌트가 화면에서 사라짐');
        }
    }, []);

    //deps 값이 존재할 경우 
    // useEffect(() => {
    //     console.log('user 값이 설정됨');
    //     console.log(user);
    //     return () => {
    //         console.log('user가 바뀌기 전');
    //         console.log(user);
    //     }
    // }, [user]);

    //deps값 생략
    // useEffect(() => {
    //     console.log(user);
    // });

    //useEffect 어떠한 값이 삭제되거나 변경될 경우 그 값을 return으로 사용한다.
    return (
        <div>
            <b style={{
                    cursor : 'pointer',
                    color : user.active ? 'green' : 'black',
            }}
            onClick={() => onToggle(user.id)}>
            {user.username}</b> <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}
function UserList({users, onRemove, onToggle}){
    return (
        <div>
            {users.map(a => (
                <User user={a} key={a.id} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    );
}

export default React.memo(UserList);