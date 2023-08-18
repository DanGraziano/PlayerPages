import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: localStorage if web, AsyncStorage if React Native
import authReducer from "./reducers/auth-reducer";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend() // Replace with your custom middleware if needed
});

const persistor = persistStore(store);

export default store;
export { store, persistor };

