import React from 'react';
import './App.css';
import TasksList from './components/TasksList';

//Redux Stuffs
import { Provider } from 'react-redux';
import store from './redux/store';


const App = () => {
	return (
		<Provider store={store}>
			<div className="App">
				<TasksList />
			</div>
		</Provider>
	);
};

export default App;
