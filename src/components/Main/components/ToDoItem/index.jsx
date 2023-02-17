import "./index.css"

function ToDoItem({item, index, openTrashModal, markAsDone, moveToTrash, nowActiveSection, deleteForever}){
    return(
        <div className="to-do-item" key={index}>
            <button onClick={()=>{openTrashModal(item)}}
            className="more-button"></button>

            <input type="checkbox" onChange={()=>{markAsDone(item)}} checked={item.isDone}/>
            <p className={`${item.isDone ? "done" : "todo-text"}`}>{item.title}</p>

            {nowActiveSection.name != "trash"  && item.isTrashModalShown && 
            <div className="trash-modal">
                <button onClick= {()=>{moveToTrash(item)}}>Move to Trash</button>
            </div>
            } 
                                
            {nowActiveSection.name == "trash" && item.isTrashModalShown && 
                <div className="trash-modal-in-trash">
                    <button className="delete-forever" onClick= {()=>{deleteForever(item)}}>Delete Forever</button>
                    <button className="move-back" onClick= {()=>{moveToTrash(item)}}>Move Back To To Do</button>
                </div>
            } 
        </div>
    );

}

export default ToDoItem;