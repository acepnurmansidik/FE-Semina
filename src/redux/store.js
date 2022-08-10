import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

/**
 * NOTE:
 * createStore = untuk membuat reduxnya /store dari redux
 * compose = untuk melihat reduxnya di dalam browser
 * combineReducers = supaya bisa make reducer yang kita buat/modif sendiri
 * applyMiddleware = gunain redux thunknya
 */

import thunk from "redux-thunk";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({});

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
