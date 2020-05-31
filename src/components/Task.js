import React, { useState, useEffect, useRef } from 'react';



const Task  = ({ task, removeTodo, updateTodo, markDone }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [placeholderValue, setPlaceholderValue] = useState('text');
  const checkboxEl = useRef(null);
  const inputRef = useRef(null);
  const taskTitleRef = useRef(null);
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
    if(event.keyCode === 13){
      let updatedTask = {
        title: event.target.value
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
    if(inputRef.current && !inputRef.current.contains(event.target)){
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
      <div className="task-buttons">
        <svg
          className="task-download-icon task-icon bi bi-download" 
          width="1em" height="1em" viewBox="0 0 16 16" 
          fill="currentColor" xmlns="http://www.w3.org/2000/svg"
          onClick={handleDownload}
        >
          <path fillRule="evenodd" d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M5 7.5a.5.5 0 01.707 0L8 9.793 10.293 7.5a.5.5 0 11.707.707l-2.646 2.647a.5.5 0 01-.708 0L5 8.207A.5.5 0 015 7.5z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M8 1a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 1z" clipRule="evenodd"/>
        </svg>
        <svg
          className="task-edit-icon task-icon bi bi-pencil-square" 
          width="1em" height="1em" viewBox="0 0 16 16" 
          fill="currentColor" xmlns="http://www.w3.org/2000/svg"
          onClick={handleUpdate}
        >
          <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clipRule="evenodd"/>
        </svg>
        <svg
          className="task-delete-icon task-icon bi bi-trash"
          width="1em" height="1em" viewBox="0 0 16 16" 
          fill="currentColor" xmlns="http://www.w3.org/2000/svg"
          data-toggle="modal" data-target={'#' + modalId}
          //onClick={handleDelete}
        >
          <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clipRule="evenodd"/>
        </svg>
      </div>

      <div id={modalId} className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button onClick={handleDelete} type="button" className="btn btn-danger" data-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Task;
