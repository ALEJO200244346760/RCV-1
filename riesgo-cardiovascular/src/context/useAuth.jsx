// src/context/useAuth.js
import { useContext } from 'react';
import AuthContext from './AuthContext'; // Ensure this path is correct

const useAuth = () => useContext(AuthContext);

export default useAuth;
