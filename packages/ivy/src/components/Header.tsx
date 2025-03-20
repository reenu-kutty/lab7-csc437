import './Header.css'
import {useNavigate} from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";


function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <div id="logo" onClick={() => navigate("/")}>
                ivy
            </div>
            <DarkModeToggle/>
        </header>
    )
}

export default Header;