import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import api from "../../api/api";
import { CgProfile } from "react-icons/cg";
import DataContext from "../../context/DataContext";
import useWindowSize from "../../hooks/useWindowSize";
const Header = () => {

    const { username, setUsername, loginSuccess, setLoginSuccess, navigate } = useContext(DataContext);
    const { width } = useWindowSize();

    useEffect(() => {
        setLoginSuccess(localStorage.getItem("isLoggedIn"));
        setUsername(localStorage.getItem("currentUser"));
    }, []);

    const handleLogout = async () => {
        try {
            const response = await api("/logout", {
                withCredentials: true
            });
            setUsername(null);
            window.localStorage.setItem("currentUser", "");
            setLoginSuccess(window.localStorage.setItem("isLoggedIn", false));
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (err) {
            console.log(err?.message);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" >
            <div className="container-fluid" >
                <Link to={"/"} className="navbar-brand" href="/" style={{ fontSize: "25px" }}>BST's Blog</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav" style={{ fontSize: "20px" }}>
                        <Link className="nav-link  text-center" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link text-center" to="/contact">Contact</Link>
                        <Link className={"nav-link text-center me-1"} to="/about">About</Link>
                        {
                            username && loginSuccess ?
                                ((width >= 1000) ? (
                                    <>
                                        <div className="navbar-collapse collapse btn-group dropdown text-center">
                                            <div className="me-2" style={{ fontSize: "25px" }}>
                                                <CgProfile />
                                                <div type="button" className="btn dropdown-toggle dropdown-toggle-split " data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span className="visually-hidden">Toggle Dropdown</span>
                                                </div>
                                                <ul className="dropdown-menu dropdown-menu-end p-3" style={{ width: "20vw", height: "fit-content" }}>
                                                    <li className="mb-2 text-center">
                                                        <Link className="dropdown-item" to="/myposts">My Posts</Link></li>
                                                    <li className="mb-2 text-center">
                                                        <Link className="dropdown-item" to="/post/newPost">New Post</Link></li>
                                                    <li className="mb-2 text-center">
                                                        <Link
                                                            className="dropdown-item"
                                                            onClick={handleLogout}
                                                        >
                                                            Logout
                                                        </Link>
                                                    </li>
                                                    <li className="mb-2 text-center">
                                                        <div

                                                            className="d-flex justify-content-center align-items-center"
                                                            style={{ fontSize: "15px" }}>
                                                            (LoggedIn as: {username})
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>

                                ) : (
                                    <>

                                        <Link to="/myposts" className="nav-link text-center" >MyPosts</Link>


                                        <Link to="/post/newPost" className="nav-link text-center">New Post</Link>


                                        <button
                                            type="submit"
                                            className="nav-link text-center"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                        <div
                                            className="d-flex justify-content-center align-items-center mt-2"
                                            style={{ fontSize: "15px" }}>
                                            LoggedIn as: {username}
                                        </div>
                                    </>
                                )
                                ) : (
                                    <Link className="nav-link text-center" to="/login">Login</Link>)
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;