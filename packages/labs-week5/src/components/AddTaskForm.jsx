function AddTaskForm() {
    return (
        <div>
            <input className="border rounded-sm mb-4 p-2" placeholder="New task name"/>
            <button className="bg-blue-600 text-white rounded-sm ml-2 p-1">Add task</button>
        </div>
    )
}

export default AddTaskForm;