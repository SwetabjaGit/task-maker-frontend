import React, { Component } from 'react';
import axios from 'axios';

export class TasksList extends Component {

	state = {
		loaded: false,
		nextTodoId: 0,
		newTodoLabel: "",
		todosList: null
	}

	componentDidMount() {
		const url = 'http://demo7326610.mockable.io/api/tasks';
		axios.get(url)
			.then((res) => {
				this.setState({
					loaded: true,
					todosList: res.data,
					nextTodoId: res.data.length
				});
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}

    markTodoAsDone = (_id) => {
		this.state.todosList.findIndex(todo => todo._id === _id);
		let newList = this.state.todosList;
		newList.map(todo => todo._id === _id ? todo.isDone = !todo.isDone : todo);
		this.setState({
			todosList: newList
		});
	};

	addNewTodo = () => {
		const newTodo = {
			"_id": this.state.nextTodoId,
			"title": this.state.newTodoLabel,
			"isDone": false
		};
		let newList = this.state.todosList;
		newList.push(newTodo);
		this.setState({
			todosList: newList,
			newTodoLabel: "",
			nextTodoId: newList.length
		});
		console.log(this.state.todosList);
	};

	removeTodo = (_id) => {
		const index = this.state.todosList.findIndex(todo => todo._id === _id);
		let newList = this.state.todosList;
		newList.splice(index, 1);
		this.setState({ todosList: newList });
		if(this.state.todosList.length === 0){
			this.setState({ nextTodoId: 0 });
		}
	};

	render() {
		const { loaded, newTodoLabel, todosList } = this.state;
		return loaded ? (
			<div className="todo-list">
				<ul>
					{
						todosList.map(todo => (
							<li key={todo._id} >
								<input
									type="checkbox"
									checked={ todo.done }
									onChange={ () => this.markTodoAsDone(todo._id) }
									label={ todo.title }
								/>
								<span className={ todo.isDone ? "done" : "" } >{ todo.title }</span>
								<button onClick={ () => this.removeTodo(todo._id) } >X</button>
							</li>
						))
					}
				</ul>
				<div className="new-todo">
					<input
						type="text"
						value={ newTodoLabel }
						onChange={ ({ target }) => this.setState({ newTodoLabel: target.value }) }
					/>
					<button onClick={ this.addNewTodo } >Add</button>
				</div>
			</div>
		) : (
			<div>Loading...</div>
		);
	}
}

export default TasksList
