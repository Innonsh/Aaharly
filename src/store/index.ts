import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { storage } from '../storage';
import authReducer from './reducer/authSlice';
import userReducer from './reducer/userSlice';

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export const appLogout = () => async (dispatch: AppDispatch) => {
    dispatch({ type: 'LOGOUT' });
    await persistor.purge();
    await storage.clearAll();
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
