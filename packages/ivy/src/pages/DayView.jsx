import {useParams} from "react-router-dom";
import './DayView.css'
import {useEffect, useState} from "react";

function DayView({username}) {
    const {date} = useParams();
    const [month, day, year] = date.split("-");
    const [isLoading, setIsLoading] = useState(false);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [text, setText] = useState("");
    const [dayEntries, setDayEntries] = useState([]);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    async function handleSave()  {
        if (text.trim() === "") return;

        const newDayEntry =  [new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), text];

        try {
            const response = await fetch(`/api/entries/${encodeURIComponent(username)}/${encodeURIComponent(date)}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ entry: newDayEntry }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update entries:", error);
        }

        setDayEntries(prevDayEntries => {
            return {
                ...prevDayEntries,
                entries: Array.isArray(prevDayEntries.entries) ? [...prevDayEntries.entries, newDayEntry] : [newDayEntry]
            };
        });


        console.log("Entries after save:", dayEntries);
        setText("");

    };

    async function createBlankEntry() {
        try {
            const response = await fetch(`/api/entries/${encodeURIComponent(username)}/${encodeURIComponent(date)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update entries:", error);
        }
    }

    async function loadUp() {
        setIsLoading(true);

        console.log('abt to load up!')

        try {
            const response = await fetch(`/api/entries/${encodeURIComponent(username)}/${encodeURIComponent(date)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log('got response')

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseBody = await response.text();

            console.log(`responsebody: ${responseBody.trim()}`)

            if (!responseBody.trim()) {
                await createBlankEntry();
            } else {
                const respEntries = JSON.parse(responseBody);
                if(respEntries) {
                    console.log("Entries:", respEntries);
                    setDayEntries(respEntries);
                }
                else {
                    setDayEntries([]);
                }
            }
        } catch (error) {
            console.error("Failed to update entries:", error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadUp();
    }, [])

    useEffect(() => {
        console.log("Entries after setting:", dayEntries.entries);
        console.log("Entries length is:", Array.isArray(dayEntries.entries.length));

    }, [dayEntries]);


    return (
        <article>
            <div id="dayview-header">
                <h1>{monthNames[month - 1]} {day}, {year}</h1>
            </div>
            <div>
                {isLoading ? (
                    <h2>Loading</h2>
                ) : (
                    <div id="dayview-content">
                        <textarea
                            value={text}
                            onChange={handleChange}
                            placeholder="spill your deepest darkest secrets..."
                        />
                        <button onClick={handleSave}>Save</button>

                        <div>
                            <h2>Saved Entries</h2>
                            <ul>
                                {Array.isArray(dayEntries.entries) && dayEntries.entries !== undefined ? (
                                    dayEntries.entries.map((entry, index) => (
                                        <li key={index}>
                                            <b>{entry[0]}:</b> {entry[1]}
                                        </li>
                                    ))
                                ) : (
                                    <li>write ur first entry ;)</li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}

export default DayView;

