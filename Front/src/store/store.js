import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import storage from "redux-persist/lib/storage";
import { 
  persistReducer, 
  persistStore,
  FLUSH,
  PAUSE,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

const persisConfig = {
  key: "auth",
  storage
};

const persistedReducer = persistReducer(persisConfig, authReducer);

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
const store = configureStore({
  reducer: {
    auth: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export default store