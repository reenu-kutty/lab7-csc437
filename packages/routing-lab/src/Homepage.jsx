import { MainLayout } from "./MainLayout.jsx";

export function Homepage(props) {
    console.log(props.userName)
    return (
        <>
            <h2>Welcome, {props.userName}</h2>
            <p>This is the content of the home page.</p>
        </>
    );
}
