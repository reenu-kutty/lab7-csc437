import { useNavigate } from "react-router-dom";
import { sendPostRequest } from "./sendPostRequest";
import UsernamePasswordForm from "./UsernamePasswordForm";
import {Link} from "react-router";

const LoginPage = ({ setAuthToken }) => {
    const navigate = useNavigate();

    const handleLogin = async ({ username, password }) => {
        const result = await sendPostRequest("/auth/login", { username, password });

        if (result.error) {
            if (result.status === 401) {
                return { type: "error", message: "Incorrect username or password." };
            } else if (result.status === 500) {
                return { type: "error", message: "Server error. Please try again later." };
            }
            return { type: "error", message: result.error };
        }

        setAuthToken(result.token);
        navigate("/");
        console.log('successful login')

        console.log(result.token)

        return { type: "success", message: "Login successful!" };
    };

    return (
        <div>
            <h1>Login</h1>
            <UsernamePasswordForm onSubmit={handleLogin}/>
            <p>
                Dont have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;
