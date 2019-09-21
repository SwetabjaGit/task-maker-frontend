import { createStore, applyMiddleWare, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};

const middleWare = [thunk];

const rootReducer = combineReducers({

});

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleWare(...middleWare),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;