import React, { Component } from 'react'

export class Task extends Component {

	render() {
		const { todo, markTodoAsDone, removeTodo } = this.props;
		return (
			<div>
				<li key={todo._id} >
					<input
						type="checkbox"
						checked={ todo.done }
						onChange={ () => markTodoAsDone(todo._id) }
						label={ todo.title }
					/>
					<span className={ todo.isDone ? "done" : "" } >{ todo.title }</span>
					<button onClick={ () => removeTodo(todo._id) } >X</button>
				</li>
			</div>
		)
	}
}

export default Task
