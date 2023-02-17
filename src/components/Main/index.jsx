import "./index.css"
import AddModal from "./components/AddModal"
import ToDoItem from "./components/ToDoItem"
import {useState} from "react"
import React from "react"
import { v4 as uuid } from "uuid";

const sectionsData = [
    {
        title: "To Do",
        isActive: true,
        name : "todo"
    },
    {
        title: "Done",
        isActive: false,
        name: "done"
    },
    {
        title: "Trash",
        isActive: false,
        name: "trash"
    }
]

function Main({itemsData}){

    const [isAddModalShown, setIsAddModalShown] = useState(false)
    const [toDoList, setToDoList] = useState(itemsData)
    const [sectionList, setSectionList] = useState(sectionsData)
    const [nowActiveSection, setNowActiveSection] = useState(sectionsData[0])


    const  openAddModal = ()=>{
        setIsAddModalShown(!isAddModalShown)
    }

    const addToDo = (item) => {
        const newToDoItem = {
            key: uuid(),
            title: item,
            isDone: false,
            isTrashModalShown: false,
            inTrash: false
        }
        setToDoList([...toDoList, newToDoItem])
        setIsAddModalShown(!isAddModalShown)
    }

    const openTrashModal = (item)=>{
        const updatedToDoItem = {
            key: uuid(),
            title: item.title,
            isDone: item.isDone,
            isTrashModalShown: (item.isTrashModalShown) ? false : true,
            inTrash: item.inTrash
        }
        const index = toDoList.indexOf(item)
        const leftSide = toDoList.slice(0, index)
        const rightSide = toDoList.slice(index+1, toDoList.leght)
        setToDoList([...leftSide, updatedToDoItem, ...rightSide])
    }

    const moveToTrash = (item) =>{
        const updatedToDoItem = {
            key: uuid(),
            title: item.title,
            isDone: item.isDone,
            isTrashModalShown: false,
            inTrash: !item.inTrash
        }
        const index = toDoList.indexOf(item)
        const leftSide = toDoList.slice(0, index)
        const rightSide = toDoList.slice(index+1, toDoList.leght)
        setToDoList([...leftSide, updatedToDoItem, ...rightSide])
    }

    const deleteForever = (item)=>{
        const index = toDoList.indexOf(item)
        const leftSide = toDoList.slice(0, index)
        const rightSide = toDoList.slice(index+1, toDoList.leght)
        setToDoList([...leftSide, ...rightSide])
    }

    const markAsDone = (item) =>{
        const updatedToDoItem = {
            key: uuid(),
            title: item.title,
            isDone: !item.isDone,
            isTrashModalShown: false,
            inTrash: item.inTrash
        }
        const index = toDoList.indexOf(item);
        const leftSide = toDoList.slice(0, index);
        const rightSide = toDoList.slice(index+1, toDoList.leght);

        (updatedToDoItem.isDone) ? setToDoList([...leftSide, ...rightSide, updatedToDoItem])
        : setToDoList([ updatedToDoItem, ...leftSide, ...rightSide])
    }

    const moveToSection = (item) => {
        const newActive = {
            title: item.title,
            isActive: true,
            name : item.name
        }
        setSectionList(
            sectionList.map((item)=>{
                item.isActive = false
            })
        )
        console.log(sectionList)
        const index = sectionList.indexOf(item)
        const leftSide = sectionList.slice(0, index)
        const rightSide = sectionList.slice(index+1, sectionList.leght)
        
        setSectionList([...leftSide, newActive, ...rightSide])

        setNowActiveSection(sectionList[index])
    }

    const filteredToDoList = toDoList.filter((item) => sectionList[0].isActive ? !item.inTrash
    : sectionList[1].isActive  ?  (item.isDone && !item.inTrash)
    : item.inTrash)


    return(
        <div>
            <div className="buttons">
                <div className="menu-buttons">
                    {sectionList && sectionList.map((item, index)=>(
                        <button key = {index} onClick={()=> {moveToSection(item)}} className={`${item.isActive ? "active" : "not-active"}`}>{item.title}</button>
                    ))}
                </div>

                <div className="modal-button">
                    {isAddModalShown && <AddModal addToDo = {addToDo}/>} 
                    <button className="add-button"
                    onClick={openAddModal}
                    >+</button>
                </div>
            </div>

            <div>
                <p className="header-text">{nowActiveSection.title}</p>
                <div className="line"></div>

                { toDoList &&
                    filteredToDoList.map((item, index) => (
                        <ToDoItem item = {item} index = {index} openTrashModal = {openTrashModal} 
                        markAsDone = {markAsDone} moveToTrash = {moveToTrash}
                        nowActiveSection = {nowActiveSection} deleteForever = {deleteForever}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Main;