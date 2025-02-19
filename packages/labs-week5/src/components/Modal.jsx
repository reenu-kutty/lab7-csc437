import {useRef} from "react";

function Modal(props) {
    const modalRef = useRef(null); // Create a reference for the inner div

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            props.onCloseRequested()
        }
    }

    return props.isOpen ? (
        <div onClick={handleClickOutside} className="w-screen h-screen bg-black/50 fixed inset-0 flex justify-center items-center">
            <div ref={modalRef} className="w-1/4 h-1/5 bg-white flex flex-col justify-center items-center">
                <header className="w-full flex justify-between items-start p-4">
                    <div>{props.headerLabel}</div>
                    <button onClick={props.onCloseRequested} aria-label="Close" className="text-slate-600">X</button>
                </header>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    ) : null;
}


export default Modal;