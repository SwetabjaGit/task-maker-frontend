/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodo } from '../redux/actions/todoActions';
import moment from 'moment';


const TaskForm = (props) => {
  const { addTodo } = props;
  const taskInputRef = useRef(null);
  const [newTaskTitle, setnewTaskTitle] = useState('');


  const handleTaskSubmitOnKeypress = (event) => {
    if(event.keyCode === 13){
      handleTaskSubmit();
    }
  };

  const handleTaskSubmit = () => {
    const newTask = {
      title: taskInputRef.current.value,
      done: false,
      createdAt: moment().format(),
      updatedAt: moment().format(),
    };
    console.log(newTask);
    addTodo(newTask);
    taskInputRef.current.value = '';
    setnewTaskTitle('');
  };

  const handleInputChange = (event) => {
    setnewTaskTitle(event.target.value);
  };

  const clearTaskInput = () => {
    taskInputRef.current.value = '';
    setnewTaskTitle('');
  };


  return (
    <div>
      <div className="create-task-form">
        <div className="row">
          <div className="form-group">
            <input
              id="create-task-input" 
              ref={taskInputRef}
              className="form-control" 
              type="text" 
              placeholder="Add Task" 
              name="title"
              onChange={handleInputChange}
              onKeyUp={handleTaskSubmitOnKeypress}
            />
          </div>
          <div className="button-group">
            <button
              id="create-task-button"
              className="btn btn-primary"
              type="button"
              onClick={handleTaskSubmit}
            >
              Create
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={clearTaskInput}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      { props.children }
    </div>
  );
}

TaskForm.propTypes = {
  todosList: PropTypes.array,
  addTodo: PropTypes.func
};

const mapStateToProps = (state) => ({
  todosList: state.TODOS.todosList
});

const mapActionsToProps = {
  addTodo
};
 
export default connect(
  mapStateToProps,
  mapActionsToProps
)(TaskForm);