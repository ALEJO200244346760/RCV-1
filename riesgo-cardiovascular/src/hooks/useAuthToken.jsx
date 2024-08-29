import useAuth from '../context/useAuth'; // Adjusted path

const useAuthToken = () => {
    const { token } = useAuth();
    return token;
};

export default useAuthToken;
