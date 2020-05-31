import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Import Reducers
import uiReducer from './reducers/uiReducer';
import todoReducer from './reducers/todoReducer';


const rootReducer = combineReducers({
	UI: uiReducer,
	TODOS: todoReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === 'development' && (
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
	)
);

export default store;