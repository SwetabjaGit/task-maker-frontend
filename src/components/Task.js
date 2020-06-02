import React, { useState, useEffect, useRef } from 'react';

// Components
import GeneralIcons from './generalIcons';
import ConfirmEditIcon from './confirmEditIcon';
import DeleteTaskModal from './deleteTaskModal';


const Task  = ({ task, removeTodo, updateTodo, markDone }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [placeholderValue, setPlaceholderValue] = useState('text');
  const checkboxEl = useRef(null);
  const inputRef = useRef(null);
  const taskTitleRef = useRef(null);
  const confirmEditRef = useRef(null);
  const modalId = 'modal_' + task._id;


  const restoreTaskTitle = () => {
    if(placeholderValue === 'edit'){
      setPlaceholderValue('text');
      placeholder = renderPlaceholder();
    }
  };

  const handleMarkDone = (event) => {
    console.log(event.target.checked);
    let updatedTask = {
      done: event.target.checked
    };
    markDone(task._id, updatedTask);
    //applyStrikeline(event.target.checked);
  };

  /* const applyStrikeline = (target) => {
    target === true
    ? taskTitleRef.current.classList.add('strike')
    : taskTitleRef.current.classList.remove('strike')
  }; */

  const handleTaskUpdate = (event) => {
    if(event.keyCode === 13 || confirmEditRef.current.contains(event.target)){
      let updatedTask = {
        title: inputRef.current.value
      };
      updateTodo(task._id, updatedTask);
      restoreTaskTitle();
    };
  };

  const handleInputChange = (event) => {
    setTaskTitle(event.target.value);
  };


  const displayCheckbox = (
    <input
      ref={checkboxEl}
      className="task-title-input"
      type="checkbox"
      id="todo"
      name="todo"
      value="todo"
      onChange={handleMarkDone}
    />
  );
  

  const displayTaskTitle = (
    <label
      ref={taskTitleRef}
      data-content={task.title}
      className="task-title-label"
    >
      {task.title}
    </label>
  );

  const displayTaskEditbox = (
    <input
      onKeyUp={handleTaskUpdate}
      ref={inputRef}
      className="task-title-edit"
      type="text"
      name="title"
      value={taskTitle}
      onChange={handleInputChange}
      autoFocus
    />
  );

  const renderPlaceholder = () => {
    if(placeholderValue === 'text') {
      return displayTaskTitle;
    } else {
      return displayTaskEditbox;
    }
  };

  let placeholder = renderPlaceholder();

  const handleDownload = () => {
    console.log(checkboxEl.current.checked);
  };

  const handleUpdate = () => {
    placeholderValue === 'text' ? setPlaceholderValue('edit') : setPlaceholderValue('text');
  };

  const handleDelete = () => {
    console.log(task._id);
    removeTodo(task._id);
  };

  useEffect(() => {
    console.log('useeffect:', task.done);
    checkboxEl.current.checked = task.done;
    //applyStrikeline(checkboxEl.current.checked);
  }, [task.done]);


  window.onmousedown = (event) => {
    if((inputRef.current && !inputRef.current.contains(event.target)) && 
       (confirmEditRef.current && !confirmEditRef.current.contains(event.target))
    ){
      console.log('Clicked Outside');
      restoreTaskTitle();
    }
  };

  window.onkeyup = (event) => {
    if(event.keyCode === 27) {
      console.log('Escape Pressed');
      restoreTaskTitle();
    }
  };
  

  return (
    <div className="feed-post">
      <div 
        className="checkbox task-title"
        id="task-title"
      >
        <div className="outer-div">
          {displayCheckbox}
          {placeholder}
        </div>
      </div>
      {placeholderValue === 'text'
        ? <GeneralIcons
            handleDownload={handleDownload}
            handleUpdate={handleUpdate}
            modalId={modalId}
          />
        : <ConfirmEditIcon
            confirmEditRef={confirmEditRef}
            handleTaskUpdate={handleTaskUpdate}
          />
      }
      <DeleteTaskModal
        modalId={modalId}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Task;
