import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Register(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e: React.FormEvent){
        e.preventDefault();

        await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });


        navigate("/login");
    };

    return (
        <form onSubmit={handleRegister}>

             <h2 style={{marginTop: "100px"}}>Please register your account....</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="nav-button" type="submit">Register</button>
        </form>
    );
}