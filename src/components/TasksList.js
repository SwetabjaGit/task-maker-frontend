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
	setTodoLabel,
	filterAll,
	filterPending,
	filterCompleted
} from '../redux/actions/todoActions';


class TasksList extends Component {

	state = {
		displayList: []
	};
	
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
				todosList,
				pendingList,
				completedList
			}
		} = this.props;

		const addNewTodo = () => {
			const newTodo = {
				"_id": nextTodoId,
				"title": newTodoLabel,
				"isDone": false
			};
			this.props.addTodo(newTodo);
		};

		const changeState = (givenList, callback) => {
			callback();
			this.setState({ displayList: givenList });
		};

		let renderList = !loading ? (
			this.state.displayList.map(todo => (
				<Task
					key={todo._id}
					todo={todo}
					markTodoAsDone={() => this.props.markDone(todo._id)}
					removeTodo={() => this.props.removeTodo(todo._id)}
				/>
			))
		) : (
			<p>Loading...</p>
		);

		return  (
			<div className="todo-list">
				<ul>
					{ renderList }
				</ul>
				<div className="new-todo">
					<input
						type="text"
						value={ newTodoLabel }
						onChange={ ({ target }) => this.props.setTodoLabel(target.value) }
					/>
					<button onClick={ addNewTodo } >Add</button>
				</div>
				<div className="visibility-filters">
					<button onClick={ () => { changeState(todosList, this.props.filterAll) } } >All Tasks</button>
					<button onClick={ () => { changeState(pendingList, this.props.filterPending ) } } >Pending</button>
					<button onClick={ () => { changeState(completedList, this.props.filterCompleted ) } } >Completed</button>
				</div>
			</div>
		)
	}

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
	setTodoLabel,
	filterAll,
	filterPending,
	filterCompleted
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