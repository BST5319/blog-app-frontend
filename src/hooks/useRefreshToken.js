import api from "../api/api";
import useAuth from "../hooks/useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.get("/refresh", {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            };
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;