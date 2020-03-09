import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(reducers, applyMiddleware(...middlewares));

sagaMiddleware.run(sagas);

// export function configureStore(initialState) {

//     const store = createStore(
//         reducers,
//         initialState,
//         compose(applyMiddleware(...middlewares))
//     );

//     sagaMiddleware.run(sagas);

//     if (module.hot) {
//         module.hot.accept('./reducers', () => {
//             const nextRootReducer = require('./reducers');
//             store.replaceReducer(nextRootReducer);
//         });
//     }

//     return store;
// }

export const persistor = persistStore(store);

export default { store, persistor };