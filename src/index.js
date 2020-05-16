import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './rootReducer'
import App from './app';


const initialState = {

	todos: [],
	inputValue: 'Задача 1'

}

const persistedState = (localStorage.getItem('reduxState') != 'false') ? JSON.parse(localStorage.getItem('reduxState')) : initialState
const store = createStore(rootReducer, persistedState)

store.subscribe(()=>{

  	localStorage['reduxState'] = JSON.stringify(store.getState())

})

const app = (

  <Provider store={ store }>
    <App/>
  </Provider>
  
)

ReactDOM.render(app, document.querySelector('#app'));