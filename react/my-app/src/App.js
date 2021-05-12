import React, {useState,useRef} from 'react';
import Hello from './hello';
import './App.css'
import Wrapper from './wrapper';
import Counter from './counter';
import InputSample from './inputSample';
import UserList from './userList';
import CreateUser from './createUser';
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
        email: 'public.velopert@gmail.com'
    },
    {
        id: 2,
        username: 'tester',
        email: 'tester@example.com'
    },
    {
        id: 3,
        username: 'liz',
        email: 'liz@example.com'
    }
  ]);
  const nextId = useRef(4);
  const [ Inputs, setInputs ] = useState({
    username: "",
    email : "",
  });
  const { username, email } = Inputs;
  const onChange = e => {
    const {name, value} = e.target;
    setInputs({
      ...Inputs,
      [name] : value,
    });
  };

  const onCreate = () => {
    const user = {
      id : nextId.current,
      username,
      email
    };
    setInputs({
      username : '',
      email : '',
    })
    setUsers([...users, user]);

    setInputs({
      username : '',
      email : '',
    });
    nextId.current += 1;;
  };
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
      <UserList users = {users}/>
    </>
  );
}

export default App;