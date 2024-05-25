import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LoginContext = createContext();

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserid = localStorage.getItem('userid');

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserid(storedUserid);
    }
  }, []);

  const login = (newUsername, password, newUserid) => {
    setIsLoggedIn(true);
    setUsername(newUsername);
    setUserid(newUserid)
    localStorage.setItem('username', newUsername);
    localStorage.setItem('userid', newUserid);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserid('')
    localStorage.removeItem('username');
    localStorage.removeItem('userid');

  };

  const updateUserInformation = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, username, userid, login, logout, updateUserInformation }}>
      {children}
    </LoginContext.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
