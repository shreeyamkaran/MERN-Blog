import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/user/register", {username, password});
            window.alert(response.data.message);
            if(response.data.message === "User registered successfully") {
                setUsername('');
                setPassword('');
                navigate('/login');
            }
        }
        catch(error) {
            window.alert(error.message);
        }
    }

    return (
        <main>
            <div className="auth">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="Username">Username: </label>
                        <input type="text" id="Username" value={username} onChange={ev => setUsername(ev.target.value)} />
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </main>
    );
}