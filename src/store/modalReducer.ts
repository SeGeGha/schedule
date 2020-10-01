/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createSlice } from '@reduxjs/toolkit';
import { ObjData } from '../models';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    pageRecord: undefined as ObjData|undefined,
  },
  reducers: {
    taskPage: (state, { payload }) => ({ ...state, pageRecord: payload }),
  },
});

export default modalSlice.reducer;

export const {
  taskPage,
} = modalSlice.actions;
