import {useState} from "react";


function AddTaskForm({onNewTask}) {
    const [name, setName] = useState("");
    function handleChange(event) {
        setName(event.target.value);
    }

    function handleSubmit() {
        setName("");
        onNewTask(name)
    }


    return (
        <div>
            <input value={name} onChange = {handleChange} className="border rounded-sm mb-4 p-2" placeholder="New task name"/>
            <button onClick={() => handleSubmit()} className="bg-blue-600 text-white rounded-sm ml-2 p-1">Add task</button>
        </div>
    )
}

export default AddTaskForm;