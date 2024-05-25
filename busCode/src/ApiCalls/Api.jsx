import axios from 'axios';
import { EncryptPassword, Decrypt } from '../Hash/Encryption';


export const loginUser = async (inputname, password, login) => {
  try {
    const response = await fetch('http://localhost:3000/users');
    const userData = await response.json();

    const user = userData.find(user => user.username === inputname);
    const decrypted = Decrypt(user.password);

    if (user && decrypted === password) {
      const userId = user.id;
      await login(inputname, password, userId);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Something went wrong');
  }
};


export const createUser = async (username, password) => {
  const encryptedPassword = EncryptPassword(password);
  try {
    const response = await axios.post('http://localhost:3000/users', {
      username,
      password: encryptedPassword,
    });

    if (response.status === 201) {
      return true;
    } else {
      throw new Error('Something went wrong');
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Something went wrong');
  }
};

// API call to update user information
export const updateUser = async (userId, newUsername, newPassword, setError) => {
  const encryptedPassword = EncryptPassword(newPassword);

  try {
    const response = await axios.put(`http://localhost:3000/users/${userId}`, {
      username: newUsername,
      password: encryptedPassword,
    });

    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Something went wrong');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    setError('Something went wrong');
    return false;
  }
};


export const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${userId}`);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  };
