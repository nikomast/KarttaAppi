import { useState } from 'react';
import { useLogin} from '../Contexts/LoginContext';
import LogoutButton from './LogOutButton'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../ApiCalls/Api';

function LoginComponent() {
  //username haetaan contextista 
  const { isLoggedIn, login, username} = useLogin();
  const [inputname, setInputname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //Toimii
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!inputname || !password) {
      setError('Username and password cannot be empty');
      return;
    } 
    try {
      const loggedIn = await loginUser(inputname, password, login);
      if (!loggedIn) {
        setError('Invalid username or password');
      }
      else{
        navigate('/userpage')
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };


  return (
    <div>
      {isLoggedIn ? (
        <>
        <p>Logged in as: {username}</p>
        <LogoutButton/>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Username"
            value={inputname}
            onChange={(e) => setInputname(e.target.value)}
          /><br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
      
    </div>
  );
}

export default LoginComponent;
