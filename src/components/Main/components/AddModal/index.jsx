import "./index.css"
import {useEffect, useState} from "react"

function Modal({addToDo}){
    const [input, setInput] = useState("")
    useEffect(()=>{
        console.log(input)
    }, [input])

    const hadleChange = (e)=>{
        setInput(e.target.value)
    }
    return(
        <div className="add-modal">
            <p>Add New To Do</p>
            <input value = {input} onChange = {hadleChange} placeholder="Your text" type="text"/>
            <button onClick= {() => {
                if(input != "" && input != " " && input != null){
                    addToDo(input);
                    setInput("")
                }
                }} >Add</button>
        </div>
    );
}

export default Modal;