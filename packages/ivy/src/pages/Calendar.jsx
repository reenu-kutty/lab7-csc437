import './Calendar.css'
import CalendarSquare from "../components/CalendarSquare.jsx";
import {useState} from "react";

function Calendar() {

    const today = new Date();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = today.getDate();
    const currMonth = today.getMonth() + 1;
    const currYear = today.getFullYear()
    const [month, setMonth] = useState(currMonth);
    const [year, setYear] = useState(() => today.getFullYear());

    const monthName = monthNames[month - 1]

    const daysInMonth = getDaysInMonth(month, year)
    console.log("days in month" + daysInMonth);

    const firstDay = getStartDayOfMonth(month, year) - 1

    const totalCells = 42;

    const calendarDays = [];

    function changeMonth(goForward) {
        let newMonth = goForward ? month + 1 : month - 1;
        let newYear = year;

        if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        } else if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        }

        setMonth(newMonth);
        setYear(newYear);
    }

    // empty spaces before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<CalendarSquare key={`empty-${i}`} isEmpty={true}></CalendarSquare>);
    }

    // days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        console.log("day is" + day)
        calendarDays.push(<CalendarSquare key={day} day={day} month={month} year={year} isEmpty={false}></CalendarSquare>);
    }

    // remaining empty spaces to keep 42 total cells
    while (calendarDays.length < totalCells) {
        calendarDays.push(<CalendarSquare key={`empty-end-${calendarDays.length}`} isEmpty={true}>1</CalendarSquare>);
    }

    console.log(calendarDays);
    return (
        <section>
            <div id="calendar-header">
                <button onClick={() => changeMonth(false)}>&lt;</button>
                <h1>{monthName}  {year}</h1>
                <button onClick={() => changeMonth(true)}>&gt;</button>
            </div>
            <div id="calendar-content">
                <h2>M</h2>
                <h2>T</h2>
                <h2>W</h2>
                <h2>Th</h2>
                <h2>F</h2>
                <h2>Sa</h2>
                <h2>Su</h2>

                {calendarDays}
            </div>
        </section>
    )
}

function getDaysInMonth(monthName, year) {
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    return new Date(year, monthIndex + 1, 0).getDate();
}

function getStartDayOfMonth(monthName, year) {
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    return new Date(year, monthIndex, 1).getDay();
}



export default Calendar;