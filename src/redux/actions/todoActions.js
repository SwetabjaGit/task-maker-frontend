import {
	SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
	STOP_LOADING_UI,
	SET_TODOS,
	ADD_TODO,
	REMOVE_TODO,
	MARK_DONE,
	SET_TODO_LABEL
} from '../actionTypes';
import axios from 'axios';


export const fetchTodos = () => (dispatch) => {
	console.log('Fetching TODOS List');
	dispatch({ type: LOADING_UI });
	const url = 'http://demo7326610.mockable.io/api/tasks';
	axios.get(url)
		.then((res) => {
			console.log('Todos:', res.data);
			dispatch(setTodos(res.data));
			dispatch(clearErrors());
			dispatch({ type: STOP_LOADING_UI });
		})
		.catch((err) => {
			console.log(err);
			dispatch(setErrors(err.response.data));
			dispatch({ type: STOP_LOADING_UI });
		});
};

export const setTodos = (data) => (dispatch) => {
	dispatch({
		type: SET_TODOS,
		payload: data
	});
};

export const addTodo = (newTodo) => (dispatch) => {
	dispatch({
		type: ADD_TODO,
		payload: newTodo
	});
};

export const removeTodo = (id) => (dispatch) => {
	dispatch({
		type: REMOVE_TODO,
		payload: id
	});
};

export const markDone = (id) => (dispatch) => {
	dispatch({
		type: MARK_DONE,
		payload: id
	});
};

export const setTodoLabel = (data) => (dispatch) => {
	dispatch({
		type: SET_TODO_LABEL,
		payload: data
	});
};

export const setErrors = (errMessage) => (dispatch) => {
	dispatch({
		type: SET_ERRORS,
		payload: errMessage
	});
};

export const clearErrors = () => (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};



