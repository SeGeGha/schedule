import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataReducer';
import modalReducer from './modalReducer';

export default configureStore({
  reducer: {
    data: dataReducer,
    modal: modalReducer,
  },
});
