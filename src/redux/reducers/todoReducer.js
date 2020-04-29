import {
	SET_TODOS,
	ADD_TODO,
	REMOVE_TODO,
	MARK_DONE,
	SET_TODO_LABEL,
	FILTER_ALL,
	FILTER_PENDING,
	FILTER_COMPLETED
} from '../actionTypes';

const initialState = {
	todosList: [],
	pendingList: [],
	completedList: [],
	nextTodoId: 0,
	newTodoLabel: ""
}

export default (state = initialState, action) => {
	switch(action.type){
		case SET_TODOS:
			return {
				...state,
				todosList: action.payload,
				nextTodoId: action.payload.length,
			};
		case ADD_TODO:
			return {
				...state,
				todosList: [
					...state.todosList,
					action.payload
				],
				nextTodoId: state.nextTodoId+1,
				newTodoLabel: ""
			};
		case REMOVE_TODO:
			return {
				...state,
				todosList: state.todosList.filter(todo => todo._id !== action.payload),
				nextTodoId: state.nextTodoId-1,
				newTodoLabel: ""
			};
		case MARK_DONE:
			return {
				...state,
				todosList: state.todosList.map(todo => todo._id === action.payload ? { ...todo, isDone: !todo.isDone } : todo)
			};
		case SET_TODO_LABEL:
			return {
				...state,
				newTodoLabel: action.payload
			};
		case FILTER_ALL:
			return {
				...state
			};
		case FILTER_PENDING:
			return {
				...state,
				pendingList: state.todosList.filter(todo => !todo.isDone)
			};
		case FILTER_COMPLETED:
			return {
				...state,
				completedList: state.todosList.filter(todo => todo.isDone)
			};
		default:
			return state;
	}
}

