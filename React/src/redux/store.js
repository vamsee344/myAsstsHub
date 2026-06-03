import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import propertyReducer from './slices/propertySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
  },
  // Ensure that any async operations or custom middlewares are handled properly
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For potentially complex objects
    }),
});

export default store;
