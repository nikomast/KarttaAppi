import { useState } from 'react';
import { createUser } from '../ApiCalls/Api';

function CreateUserComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateUser = async () => {
    try {
      await createUser(username, password, setUsername, setPassword, setError);
      setUsername('');
      setPassword('');
      setSuccessMessage('User created successfully!');
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleCreateUser}>Create User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default CreateUserComponent;
