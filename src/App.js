import { useState } from "react";
import trash from "./trash.svg";

function App() {
  //two state handel input and to do list
  //we want it as a string input
  const [taskInput, updateTaskInput] = useState("");
  //it si an empty array because we want to store the to do list in an array
  const [toDoList, updateToDoList] = useState([]);

  const getTaskObject = (description,isComplete)=>{
    return {
      description,
      isComplete
    }
  }

  const inputKeyDown = (event) => {
    if (event.keyCode === 13) {
      addTask();

    }
  }

  const addTask = () => {
    //check if inpu is not empty 
    if (!taskInput || !taskInput.trim().length) {
      alert("Please enter a task");
      return;
    }
    //add the task to the to do list
    toDoList.push(getTaskObject(taskInput,false));
    //update the tlist
    updateToDoList(toDoList);
    //update the input
    updateTaskInput("");

    }

  const deleteTask = (index) => {
    //save any task that has an index that differ fromt the passed index
    let splice= toDoList.filter((item,i)=>i!==index);
    //update the tlist
    updateToDoList(splice);
  }

  const markComplete = (index) => {
    //we spread the current tdolist and we save it for  a new list
    const list = [...toDoList];

    //update the targeted task status
    list[index].isComplete = !list[index].isComplete;
    //update the tlist
    updateToDoList(list);

  }
  

  function EmptyListMessage() {
    return (
      <>
        <p className="no-item-text">
          <span role="img" aria-label="react">
            🤓
          </span>{" "}
          &nbsp; No task added !!
        </p>
      </>
    );
  }

  function ListItem(props) {
    return (
      <div className="list-item row jc-space-between">
        <span
          className={props.itemData.isComplete ? "task-complete" : ""}
          onClick={() => props.markComplete(props.index)}
        >
          {props.itemData.isComplete ? "✅" : ""}&nbsp;
          {props.itemData?.description}
        </span>
        <img
          className="delete-icon"
          src={trash}
          alt="delete-task"
          onClick={() => props.deleteTask(props.index)}
        ></img>
      </div>
    );
  }

  return (
    <div className="app-background">
      <p className="heading-text">
        Daily To Do List{" "}
        <span role="img" aria-label="react">
          🚀
        </span>
      </p>
      <div className="task-container column">
        <div className="row">
          {/*the input box is what we want to handle 
          so we give it thw task input s anything we wirte it here 
          we save it the valye   */}
          <input
            className="text-input"
            value={taskInput}
            onKeyDown={inputKeyDown}
            onChange={(event) => updateTaskInput(event.target.value)}
          />
          <button className="add-button" onClick={addTask}>ADD</button>
        </div>
        {
          //if the to do list is empty we want to show the message
          //if not print all the list items
          toDoList?.length ?(
            toDoList.map((toDoObject, index)=>(
              //lists need keys 
              <ListItem
                key={index}
                //or iteData={iscompleye.description}
                itemData={toDoObject}
                markComplete= {markComplete}
                index={index}
                deleteTask={deleteTask}
              />
            ))
          ):(
           <EmptyListMessage /> 
           )
          }
      </div>
    </div>
  );
}

export default App;
