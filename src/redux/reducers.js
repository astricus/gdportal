import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import settings from './settings/reducer';
import menu from './menu/menu.reducer';

const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
  menu,
  settings
});

export default persistReducer(persistConfig, reducers);