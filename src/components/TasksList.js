import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

// Redux stuff
import { connect } from 'react-redux';
import {
	fetchTodos,
	addTodo,
	removeTodo,
	markDone,
	setTodoLabel
} from '../redux/actions/todoActions';


class TasksList extends Component {
	
	componentDidMount = () => {
		this.props.fetchTodos();
	};

	render() {
		
		const {
			UI: {
				loading
			},
			TODOS: {
				nextTodoId,
				newTodoLabel,
				todosList
			}
		} = this.props;

		const addNewTodo = () => {
			const newTodo = {
				"_id": nextTodoId,
				"title": newTodoLabel,
				"isDone": false
			};
			this.props.addTodo(newTodo);
		}

		return !loading ? (
			<div className="todo-list">
				<ul>
					{   
						todosList.map(todo => (
							<Task
								key={todo._id}
								todo={todo}
								markTodoAsDone={() => this.props.markDone(todo._id)}
								removeTodo={() => this.props.removeTodo(todo._id)}
							/>
						))  
					}
				</ul>
				<div className="new-todo">
					<input
						type="text"
						value={ newTodoLabel }
						onChange={ ({ target }) => this.props.setTodoLabel(target.value) }
					/>
					<button onClick={ addNewTodo } >Add</button>
				</div>
			</div>
		) : (
			<div>Loading...</div>
		);
	}

}

TasksList.propTypes = {
	fetchTodos: PropTypes.func.isRequired,
	addTodo: PropTypes.func.isRequired,
	removeTodo: PropTypes.func.isRequired,
	markDone: PropTypes.func.isRequired,
	setTodoLabel: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
	TODOS: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	UI: state.UI,
	TODOS: state.TODOS
});

const mapActionsToProps = {
	fetchTodos,
	addTodo,
	removeTodo,
	markDone,
	setTodoLabel
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(TasksList);

/* const mapDispatchToProps = (dispatch) => ({
	fetchTodos: () => { dispatch(fetchTodos()) },
	addTodo: (data) => { dispatch(addTodo(data)) },
	removeTodo: (id) => { dispatch(removeTodo(id)) },
	markDone: (id) => { dispatch(markDone(id)) },
	setTodoLabel: (data) => { dispatch(setTodoLabel(data)) }
}); */