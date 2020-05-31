/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

// Redux stuff
import { connect } from 'react-redux';
import { 
  fetchTodos,
  removeTodo,
  updateTodo,
  markDone
} from '../redux/actions/todoActions';


const TasksList = (props) => {
  const { 
    todosList, 
    fetchTodos, 
    removeTodo, 
    updateTodo, 
    markDone
  } = props;
  const [tasksList, setTasksList] = useState([]);

  
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setTasksList(tasksList);
  }, [todosList]);

  let renderList = todosList ? (
    todosList.map(task => (
      <Task
        key={task._id}
        task={task}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        markDone={markDone}
      />
    ))
  ) : (
    <p>Loading...</p>
  );
  
  return  (
    <div className="posts-wrapper">
      {renderList}
    </div>
  );
}

TasksList.propTypes = {
  loading: PropTypes.bool,
  fetchTodos: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  markDone: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  todosList: state.TODOS.todosList
});

const mapActionsToProps = {
  fetchTodos,
  removeTodo,
  updateTodo,
  markDone
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TasksList);
