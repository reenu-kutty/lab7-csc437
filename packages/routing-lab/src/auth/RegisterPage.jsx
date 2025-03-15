import UsernamePasswordForm from "./UsernamePasswordForm";
import {Link} from "react-router";
import {sendPostRequest} from "./sendPostRequest.js";
import {useNavigate} from "react-router-dom";

const RegisterPage = ({ setAuthToken }) => {
    const navigate = useNavigate();

    const handleRegister = async ({ username, password }) => {
        const result = await sendPostRequest("/auth/register", { username, password });

        if (result.error) {
            if (result.status === 409) {
                return { type: "error", message: "Username already exists." };
            } else if (result.status === 400) {
                return { type: "error", message: "Please provide a username and password." };
            } else if (result.status === 500) {
                return { type: "error", message: "Server error. Please try again later." };
            }
            return { type: "error", message: result.error };
        }

        if (result.token) {
            setAuthToken(result.token);
            navigate("/");
        } else {
            console.error("Token not found in result:", result);
            return { type: "error", message: "Login failed, no token received." };
        }

        return { type: "success", message: "Account created successfully!" };
    };

    return (
        <div>
            <h1>Register a New Account</h1>
            <UsernamePasswordForm onSubmit={handleRegister}/>
            <p>
                Have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
