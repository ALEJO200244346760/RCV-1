import { useContext } from 'react';
import AuthContext from './AuthContext'; // Adjusted path

const useAuth = () => useContext(AuthContext);

export default useAuth;
