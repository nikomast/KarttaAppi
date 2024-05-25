import { useLogin } from '../Contexts/LoginContext';

function LogoutButton() {
  const { isLoggedIn, logout } = useLogin();

  const handleLogout = () => {
    logout();
  };

  return (
    isLoggedIn && (
      <button onClick={handleLogout}>Logout</button>
    )
  );
}

export default LogoutButton;
