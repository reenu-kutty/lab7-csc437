import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

function Todo(props) {
    return (
        <li className="mt-2">
            <label>
                <input onChange={() => props.toggleTaskCompleted(props.id)} id={ props.id } type="checkbox"/>{ props.name }
            </label>
            <button onClick={() => props.deleteTask(props.id)} className="ml-8 text-gray-500"><FontAwesomeIcon title="delete" icon={faTrashCan}/></button>
        </li>
    )
}

export default Todo;