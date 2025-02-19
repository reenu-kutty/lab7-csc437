import Todo from "./components/Todo.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import React from "react";
import { nanoid } from "nanoid";
import Modal from "./components/Modal.jsx";
import {GroceryPanel} from "./GroceryPanel.jsx";


function App(props) {
    // eslint-disable-next-line react/prop-types
    const [taskList, setTaskList] = React.useState(props.tasks);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    function addTask(name) {
        const newTask = { id: `todo-${nanoid()}`, name: name};
        setTaskList([...taskList, newTask]);
        setModalOpen(false);
    }

    function toggleTaskCompleted(id) {
        const updatedTasks = taskList.map((task) => {
            if (id === task.id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTaskList(updatedTasks);
    }

    function deleteTask(id){
        const remainingTasks = taskList.filter((task) => id !== task.id);
        setTaskList(remainingTasks);
    }

    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
            <div> {/* Unfortunately comments in JSX have to be done like this */}

            </div>
            <button className="bg-blue-500 p-2 text-white mb-4" onClick={() => setModalOpen(true)}>Add Task</button>
            <section>
                <h1 className="text-xl font-bold">To do</h1>
                <ul>
                    {taskList.map((task) => (
                        <Todo id={task.id} name={task.name} key={task.id} completed={task.completed} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask}/>
                    ))}
                </ul>
            </section>
            <Modal isOpen={modalOpen} onCloseRequested={() => setModalOpen(false)} headerLabel="New Task"><AddTaskForm onNewTask={addTask}/></Modal>
            <GroceryPanel error={error} setError={setError} isLoading={isLoading} setIsLoading={setIsLoading} addTask={addTask}/>
        </main>
    );
}

export default App;
