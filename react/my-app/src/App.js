import React, {useState,useRef,useMemo, useCallback} from 'react';
import Hello from './hello';
import './App.css'
import Wrapper from './wrapper';
import Counter from './counter';
import InputSample from './inputSample';
import UserList from './userList';
import CreateUser from './createUser';

function conuntActiveUsers(users){
  console.log('활성 사용자 수 세는 중 ...');
  return users.filter((user) => user.active).length;
}
function App(){
  const name = 'react';
  const style = {
    backgroundColor : 'black',
    color : 'aqua',
    fontSize : 24, //기본 단위 px
    padding : '1rem'
  }
  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active : true,
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active : false,
    },
    {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active : false,
    }
  ]);
  const nextId = useRef(4);
  const [ Inputs, setInputs ] = useState({
    username: "",
    email : "",
  });
  const { username, email } = Inputs;

  //useCallback의 두번째 파라미터인 deps배열에는 함수안에서 사용하는 상태나 props를 넣는다.
  //deps 배열안에 값을 넣지 않게 되면 함수 내에서 해당 값들을 참조할 때 가장 최신 값을 참조하는 것을 보장할 수 없다.
  //set~~함수를 사용하면 최신값이 보존되기 때문에 users를 deps에 안넣어도 된다. 대신 set~함수에 users와 같이 파라미터로 함수형으로 만들어줘야한다.
  const onChange = useCallback( e => {
    const {name, value} = e.target;
    setInputs(Inputs => ({
      ...Inputs,
      [name] : value,
    }));
  }, []);

  const onCreate = useCallback(() => {
    const user = {
      id : nextId.current,
      username,
      email
    };
    setUsers(users => [...users, user]);
    setInputs({
      username : '',
      email : '',
    })
    nextId.current += 1;;
  }, [username, email]);
  
  const onRemove = useCallback((id) =>{
    setUsers(users => users.filter(user => user.id !== id));
  },[]);

  const onToggle = useCallback((id) => {
    setUsers(users =>
      users.map(user => user.id === id ? {...user, active : !user.active} : user)  
    );
  }, []);

  //useMemo의 첫번째 파라미터에는 어떤 연산할지 정의하는 함수,
  //두번째 파라미터에는 deps 배열로 이 배열 안에 넣은 내용이 바뀌면,
  //첫뻔재 파라미터의 함수를 실행하고, 내용이 바뀌지 않았다면 이전 값을 재사용
  const count = useMemo(() => conuntActiveUsers(users), [users]); 
  return (
    <>
      <Hello name="react" color="red" isSpecial={true}/>
      <Hello color="pink"/>
      <div style={style}>{name}</div>
      <div className="gray-box"></div>
      <Wrapper>
        <Hello name='react' color='red'/>
        <Hello color='red'/>
      </Wrapper>
      <Counter />
      <InputSample />
      <CreateUser 
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList 
        users = {users}
        onRemove={onRemove}
        onToggle={onToggle}
      />
      <div>활성 사용자 수  : {count}</div>
    </>
  );
}

export default App;