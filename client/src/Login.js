import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "./UserContext";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUserInfo} = useContext(UserContext);
    const navigate = useNavigate();

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/user/login", {username, password});
            window.alert(response.data.message);
            if(response.data.message === "User logged in successfully") {
                setUserInfo(response.data.username);
                setUsername('');
                setPassword('');
                navigate('/');
                window.localStorage.setItem("token", response.data.token);
            }
        }
        catch(error) {
            window.alert(error.message);
        }
    }

    return (
        <main>
            <div className="auth">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="username">Username: </label>
                        <input type="text" id="username" value={username} onChange={ev => setUsername(ev.target.value)} />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    </div>

                    <button type="submit">Login</button>
                </form>
            </div>
        </main>
    );
}