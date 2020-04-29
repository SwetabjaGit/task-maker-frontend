import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

// Redux stuff
import { connect } from 'react-redux';
import {
	fetchTodos,
	addTodo,
	removeTodo,
	markDone,
	setTodoLabel,
	filterAll,
	filterPending,
	filterCompleted
} from '../redux/actions/todoActions';


const TasksList = (props) => {

  const {
    loading,
    filteredList,
    nextTodoId
  } = props;

  //const [tasksList, setTasksList] = useState([]);
  const [newTodoLabel, setNewTodoLabel] = useState('');


  useEffect(() => {
    props.fetchTodos();
  }, []);

  useEffect(() => {
    console.log(filteredList);
    //setTasksList(filteredList);
  }, [filteredList]);
  
  

	const addNewTodo = () => {
		const newTodo = {
			_id: nextTodoId,
			title: newTodoLabel,
			isDone: false
    };
    setNewTodoLabel('');
	  props.addTodo(newTodo);
	};
  
  const filterAllTasks = () => {
    props.filterAll();
  };

  const filterPendingTasks = () => {
    props.filterPending();
  };

  const filterCompletedTasks = () => {
    props.filterCompleted();
  };

  const handleInputChange = (event) => {
    setNewTodoLabel(event.target.value);
  };

	let renderList = !loading ? (
	  filteredList.map(todo => (
			<Task
				key={todo._id}
				todo={todo}
				markTodoAsDone={() => props.markDone(todo._id)}
				removeTodo={() => props.removeTodo(todo._id)}
			/>
		))
	) : (
		<p>Loading...</p>
  );
  
  return  (
    <div className="todo-list">
      <ul>
        {renderList}
      </ul>
      <div className="new-todo">
        <input
          type="text"
          value={newTodoLabel}
          onChange={handleInputChange}
        />
        <button onClick={addNewTodo}>
          Add
        </button>
      </div>
      <div className="visibility-filters">
        <button onClick={filterAllTasks}>
          All Tasks
        </button>
        <button onClick={filterPendingTasks}>
          Pending
        </button>
        <button onClick={filterCompletedTasks}>
          Completed
        </button>
      </div>
    </div>
  );
}

TasksList.propTypes = {
	fetchTodos: PropTypes.func.isRequired,
	addTodo: PropTypes.func.isRequired,
	removeTodo: PropTypes.func.isRequired,
	markDone: PropTypes.func.isRequired,
	setTodoLabel: PropTypes.func.isRequired,
	filterAll: PropTypes.func.isRequired,
	filterPending: PropTypes.func.isRequired,
	filterCompleted: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	filteredList: PropTypes.array.isRequired,
	nextTodoId: PropTypes.number
};

const mapStateToProps = (state) => ({
	loading: state.UI.loading,
  filteredList: state.TODOS.filteredList,
  nextTodoId: state.TODOS.nextTodoId
});

const mapActionsToProps = {
	fetchTodos,
	addTodo,
	removeTodo,
	markDone,
	setTodoLabel,
	filterAll,
	filterPending,
	filterCompleted
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(TasksList);
