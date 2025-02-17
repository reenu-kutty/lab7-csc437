import Todo from "./components/Todo.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";

function App(props) {
    // eslint-disable-next-line react/prop-types
    const taskList = props.tasks?.map((task) => (
        <Todo id={task.id} name={task.name} key={task.id}/>
    ))
    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
            <div> {/* Unfortunately comments in JSX have to be done like this */}
                <AddTaskForm></AddTaskForm>
            </div>

            <section>
                <h1 className="text-xl font-bold">To do</h1>
                <ul>
                    {taskList}
                </ul>
            </section>
        </main>
    );
}

export default App;
