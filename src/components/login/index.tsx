import { useContext, useState } from "react";
import { AuthenticatorContext } from "../../contexts/Authenticator";

const Login = () => {
    const { login } = useContext(AuthenticatorContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setMessage("Email and password are required");
            return;
        }
        login({ email: email, password: password });
    }
    
    return (
        <div>
            <form onSubmit={handleClick}>
                <div><input value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /></div>
                <div><input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /></div>
                <div><button type="submit">Log in</button></div>
            </form>
            <div>{message}</div>
        </div>
    )
}

export default Login;