import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

function Todo(props) {
    return (
        <li className="mt-2">
            <label>
                <input id={ props.id } type="checkbox"/>{ props.name }
            </label>
            <button className="ml-8 text-gray-500"><FontAwesomeIcon title="delete" icon={faTrashCan}/></button>
        </li>
    )
}

export default Todo;