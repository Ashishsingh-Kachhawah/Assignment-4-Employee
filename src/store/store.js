import{compose, createStore, applyMiddleware} from 'redux';
import { configureStore } from "@reduxjs/toolkit"
// import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../Sagas/SagaIndex';

const sagaMiddleware = createSagaMiddleware();

 const store = compose(applyMiddleware(sagaMiddleware))(createStore)(rootReducer);
 sagaMiddleware.run(rootSaga)

 export default store;