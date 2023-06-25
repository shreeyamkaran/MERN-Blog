import {useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {UserContext} from "./UserContext";

export default function Header() {

    const {userInfo, setUserInfo} = useContext(UserContext);

    useEffect(function() {
        const token = window.localStorage.getItem("token");
        async function fetchUsernameFromJwt() {
            const response = await axios.get(`http://localhost:4000/user/profile/${token}`);
            setUserInfo(response.data.username);
        }
        fetchUsernameFromJwt();
    }, []);

    function logout() {
        window.localStorage.clear();
        setUserInfo(null);
    }

    const username = userInfo;

    return (
        <>
            {
                username && (
                    <p className="username">Welcome, <span>{username}</span></p>
                )
            }
            <header>
            <div className="logo">
                <Link to="/">Blogs</Link>
            </div>
            {
                username? (
                    <div className="nav-links">
                        <Link to="/new/blog">Create New Blog</Link>
                        <a href="/" onClick={logout}>Logout</a>
                    </div>
                ) : (
                    <div className="nav-links">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )
            }
            </header>
        </>
    );
}
