import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import useAuth from '../../hooks/useAuth';
import api from '../../api/api';

const LOGIN_URI = "/login";

const Login = () => {
    const navigate = useNavigate("");
    const { setUsername, setLoginSuccess } = useContext(DataContext);
    const { setAuth, persist, setPersist } = useAuth();
    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);






    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const response = await api.post(LOGIN_URI,
                JSON.stringify({ username, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                });

            if (response?.data?.message === "ok") {
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                setAuth({ username, password, roles, accessToken });
                window.localStorage.setItem("isLoggedIn", true);
                window.localStorage.setItem("currentUser", username);
                setUsername(username);
                setLoginSuccess(true);
                navigate("/");

            } else {
                setError(true);
                window.localStorage.setItem("isisLoggedIn", false);
                setTimeout(() => {
                    navigate("/login");
                    setError(false);
                }, 1500);
            }
        }
        catch (err) {
            setError(true);
            setTimeout(() => {
                navigate("/login");
                setError(false);
            }, 1500);
        }
        setUser("");
        setPassword("");

    };

    const togglePersist = () => {
        setPersist(prev => !prev);
    };

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);


    return (
        <div className="container login-form-container" >
            {
                error ? (
                    <section className='d-flex justify-content-center align-items-center flex-column' >
                        <h6 className='mt-4 mb-2 text-center'>Error! Incorrect username or Password</h6>
                        <h6 className='mt-3' >Redirecting You to Login Again...</h6>
                    </section>
                ) : (
                    <div className="border mt-3 p-4 rounded">
                        <form method='POST' onSubmit={handleSubmit} className=''>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text"
                                    className="form-control mt-3"
                                    id="username"
                                    placeholder="Enter Username"
                                    value={username}
                                    name="username"
                                    autoComplete='on'
                                    onChange={(e) => (setUser(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="mt-3">Password:</label>
                                <input
                                    type="password"
                                    className="form-control mt-3"
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    autoComplete='on'
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="checkbox mt-3">
                                <label><input
                                    type="checkbox"
                                    name="persist"
                                    value={persist}
                                    onChange={() => togglePersist()}
                                /> Remember me

                                </label>
                            </div>
                            <div className="d-flex justify-content-center" >
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3 ">Submit
                                </button>
                            </div>
                            <div className='mt-3'>
                                Create new account?
                                <Link to={"/signup"}> SignUp</Link>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

export default Login;