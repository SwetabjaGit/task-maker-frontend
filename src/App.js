import React from 'react';
import './App.scss';
import TaskForm from './components/TaskForm';
import TasksList from './components/TasksList';

// Redux Stuffs
import { Provider } from 'react-redux';
import store from './redux/store';

require('dotenv').config();

console.log('environment: ', process.env.NODE_ENV);


const App = () => {
	return (
		<Provider store={store}>
			<div className="container main-app-page">
        <h1>Task Maker</h1>
        <TaskForm>
          <TasksList />
        </TaskForm>
			</div>
		</Provider>
	);
};

export default App;
