import {
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

const initialState = {
  todosList: [],
  nextTodoId: 0,
  newTodoLabel: ''
};

export default (state = initialState, action) => {
  switch(action.type){
    case SET_TODOS:
      return {
        ...state,
        todosList: action.payload,
      };
    case ADD_TODO:
      return {
        ...state,
        todosList: [
          action.payload,
          ...state.todosList
        ]
      };
    case UPDATE_TODO:
      return {
        ...state,
        todosList: state.todosList.map(
          todo => todo._id === action.payload._id
          ? {
            ...todo,
            title: action.payload.title
          } : todo
        )
      };
    case MARK_DONE:
      return {
        ...state,
        todosList: state.todosList.map(
          todo => todo._id === action.payload._id
          ? {
            ...todo, 
            done: !todo.done 
          } : todo
        )
      };
    case REMOVE_TODO:
      return {
        ...state,
        todosList: state.todosList.filter(todo => todo._id !== action.payload)
      };
    case SET_TODO_LABEL:
      return {
        ...state,
        todosList: action.payload
      };
    case FILTER_ALL:
      return {
        ...state,
        todosList: state.todosList
      };
    case FILTER_PENDING:
      return {
        ...state,
        todosList: state.todosList.filter(todo => !todo.isDone)
      };
    case FILTER_COMPLETED:
      return {
        ...state,
        todosList: state.todosList.filter(todo => todo.isDone)
      };
    default:
      return state;
  }
}

