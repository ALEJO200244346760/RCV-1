import useAuth from '../context/useAuth'; // Ensure this path is correct

const useAuthToken = () => {
    const { token } = useAuth();
    return token;
};

export default useAuthToken;
