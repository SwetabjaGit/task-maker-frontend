import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  MARK_DONE,
  SET_TODO_LABEL,
  FILTER_ALL,
  FILTER_PENDING,
  FILTER_COMPLETED
} from '../actionTypes';
import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://node-todo-90032.herokuapp.com/api'
  : 'http://localhost:8080/api';
  


export const fetchTodos = () => (dispatch) => {
  console.log(baseUrl);
  dispatch({ type: LOADING_UI });
  const url = baseUrl + '/tasks';
  axios.get(url)
    .then((res) => {
      dispatch(setTodos(res.data));
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
      dispatch(setErrors(err.response));
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
  const url = baseUrl + '/tasks/task';
  axios.post(url, newTodo)
    .then(res => {
      dispatch({
        type: ADD_TODO,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err);
      dispatch(setErrors(err.response));
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const updateTodo = (id, data) => (dispatch) => {
  const url = baseUrl + `/tasks/task/${id}`;
  axios.put(url, data, {
    params: { id }
  }).then(res => {
      console.log('updatedTitle: ', res.data.title);
      let updData = {
        _id: id,
        title: data.title
      }
      dispatch({
        type: UPDATE_TODO,
        payload: updData
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err);
      dispatch(setErrors(err.response));
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const markDone = (id, data) => (dispatch) => {
  const url = baseUrl + `/tasks/task/${id}`;
  axios.put(url, data, {
    params: { id }
  }).then(res => {
      console.log(res.data.done);
      dispatch({
        type: MARK_DONE,
        payload: data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err);
      dispatch(setErrors(err.response));
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const removeTodo = (id) => (dispatch) => {
  const url = baseUrl + `/tasks/task/${id}`;
  axios.delete(url)
    .then(res => {
      //console.log('Removed Doc: ', res.data);
      dispatch({
        type: REMOVE_TODO,
        payload: res.data._id
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err);
      dispatch(setErrors(err.response));
      dispatch({ type: STOP_LOADING_UI });
    });
};

export const setTodoLabel = (data) => (dispatch) => {
  dispatch({
    type: SET_TODO_LABEL,
    payload: data
  });
};

export const filterAll = () => (dispatch) => {
  dispatch({
    type: FILTER_ALL
  });
};

export const filterPending = () => (dispatch) => {
  dispatch({
    type: FILTER_PENDING
  });
};

export const filterCompleted = () => (dispatch) => {
  dispatch({
    type: FILTER_COMPLETED
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



