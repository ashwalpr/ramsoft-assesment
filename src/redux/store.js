import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    tasksList: tasksReducer,
  },
});

// import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import tasksReducer from "./tasksSlice";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, tasksReducer);

// export const store = configureStore({
//   reducer: {
//     tasksList: persistedReducer,
//   },
// });

// export const persistor = persistStore(store);
