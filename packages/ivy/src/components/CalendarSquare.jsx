import './CalendarSquare.css'
import {useNavigate} from "react-router-dom";

function CalendarSquare(props) {
    const navigate = useNavigate();
    const future = beforeToday(props.month, props.day, props.year) < 0

    function clickSquare(month, day, year) {
        if(!future && !props.isEmpty) {
            navigate(`/day/${month}-${day}-${year}`);
        }
    }
    console.log(future || props.isEmpty)
    return (
        <section id={isToday(props.month, props.day, props.year) ? "current-day": ""} className= {`square ${(future || props.isEmpty) ? "uneditable" : ""}`} onClick={() => clickSquare(props.month, props.day, props.year)}>
            {props.day}
        </section>
    )
}

function isToday(month, day, year) {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();
}

function beforeToday(month, day, year) {
    const today = new Date();
    const todayTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const dateTimestamp = new Date(year, month - 1, day).getTime();

    return todayTimestamp - dateTimestamp;
}

export default CalendarSquare;