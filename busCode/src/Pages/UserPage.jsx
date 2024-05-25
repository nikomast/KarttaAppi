import { useState } from 'react';
import { useLogin } from '../Contexts/LoginContext';
import { updateUser, deleteUser } from '../ApiCalls/Api';

function UserPage() {
  const { username, userid, isLoggedIn, updateUserInformation, logout } = useLogin();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleUpdateUser = async () => {
    try {
      await updateUser(userid, newUsername, newPassword, setError);
      setNewUsername('');
      setNewPassword('');
      updateUserInformation(newUsername)
      setSuccessMessage('User information updated successfully!');
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const handleDeleteUser = async () => {
    try {
        const success = deleteUser(userid);
        if(success){
            setSuccessMessage('User account deleted successfully!');
            logout();
        }
        else{
            setError('Failed to delete user account'); 
        }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const toggleConfirmation = () => {
    setIsConfirmingDelete(!isConfirmingDelete);
  };

  return (
    <>
    {!isLoggedIn ? (
        <>
        <p>Login or create an account to access this page</p>
        </>
        
      ) : (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>Here you can modify your user information:</p>
      <input
        type="text"
        placeholder="New Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      /><br/>
      <button onClick={handleUpdateUser}>Update User Information</button>
      {isConfirmingDelete ? (
        <>
          <p>Are you sure you want to delete your account?</p>
          <button onClick={handleDeleteUser}>Yes, Delete Account</button>
          <button onClick={toggleConfirmation}>Cancel</button>
        </>
      ) : (
        <button onClick={toggleConfirmation}>Delete User Account</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>)}
    </>
  );
}

export default UserPage;
