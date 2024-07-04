import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../hooks/useAxiosFetch';
const { REACT_APP_SITE } = process.env;
const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const { data, fetchError, isLoading } = useAxiosFetch(`${REACT_APP_SITE}/posts`);

    const [username, setUsername] = useState((prev) => {
        const user = localStorage.getItem("currentUser");
        return user !== null ? user : prev;
    });
    const [loginSuccess, setLoginSuccess] = useState((prev) => {
        const LoggedIn = localStorage.getItem("isLoggedIn");
        return LoggedIn !== null ? LoggedIn : prev;
    });

    useEffect(() => {
        setUsername(window.localStorage.getItem("currentUser"));
        setLoginSuccess(window.localStorage.getItem("isLoggedIn"));
    }, []);

    useEffect(() => {
        setPosts(data);
    }, [data]);

    const navigate = useNavigate("");

    return (
        <DataContext.Provider
            value={{
                username, setUsername, loginSuccess, setLoginSuccess,
                navigate, posts, setPosts, fetchError, isLoading
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;