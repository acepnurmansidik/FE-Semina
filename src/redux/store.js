import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import thunk from "redux-thunk";
import authReducer from "./auth/reducer";
import categoriesReducer from "./categories/reducer";
import notifReducer from "./notif/reducer";
import talentsReducer from "./talents/reducer";

/**
 * NOTE:
 * createStore = untuk membuat reduxnya /store dari redux
 * compose = untuk melihat reduxnya di dalam browser
 * combineReducers = supaya bisa make reducer/state yang kita buat/custome sendiri
 * applyMiddleware = gunain redux thunknya
 */

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  notif: notifReducer,
  talents: talentsReducer,
});

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
