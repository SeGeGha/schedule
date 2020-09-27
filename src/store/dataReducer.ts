/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { createFilterTypes, createUniqTypesObj } from '../utils';
// import { createUniqTypesObj } from '../utils';
import fetchSwagger from '../api/fetchSwagger';
import { ObjData, ObjState } from '../models';

const dataSlice = createSlice({
  name: 'req',
  initialState: {
    dataBase: [],
    uniqTypesObj: [],
    filterTypes: [],
    loading: false,
    errorReq: false,
  } as ObjState,
  reducers: {
    uniqTypesAction: (state) => ({ ...state, uniqTypesObj: createUniqTypesObj(state.dataBase) }),
    filterTypesAction: (state) => ({ ...state, filterTypes: createFilterTypes(state.uniqTypesObj) }),
    getAllData: (state, { payload }) => ({ ...state, dataBase: payload }),
    addOneData: (state, { payload }) => ({ ...state, dataBase: [...state.dataBase, payload] }),
    changeOneData: (state, { payload }) => {
      const { id } = payload;
      const dataBase = state.dataBase
        .map((item: ObjData) => ((item.id === id) ? payload : item));
      return { ...state, dataBase };
    },
    delOneData: (state, { payload }) => {
      const { id } = payload;
      const dataBase = state.dataBase.filter((item: ObjData) => (item.id !== id));
      return { ...state, dataBase };
    },
    startLoad: (state) => ({ ...state, loading: true }),
    stopLoad: (state) => ({ ...state, loading: false }),
    showError: (state) => ({ ...state, errorReq: true }),
    hideError: (state) => ({ ...state, errorReq: false }),
  },
});

export default dataSlice.reducer;

export const {
  startLoad,
  stopLoad,
  showError,
  hideError,
} = dataSlice.actions;

const {
  getAllData,
  addOneData,
  changeOneData,
  delOneData,
  uniqTypesAction,
  filterTypesAction,
} = dataSlice.actions;

function errors(dispatch: Dispatch) {
  dispatch(showError());
  setTimeout(() => {
    dispatch(hideError());
  }, 2000);
}

export const getAllDataAsync = () => ((dispatch: Dispatch): void => {
  dispatch(startLoad());
  fetchSwagger('', null)
    .then((res) => {
      if ('data' in res) {
        const { data } = res;
        return Promise.resolve(data);
      }
      return Promise.reject();
    })
    .then((data) => {
      dispatch(getAllData(data));
      dispatch(stopLoad());
      dispatch(uniqTypesAction());
      dispatch(filterTypesAction());
    })
    .catch(() => {
      dispatch(stopLoad());
      errors(dispatch);
    });
});

export const addOneDataAsync = (bodyOne: ObjData) => ((dispatch: Dispatch): void => {
  dispatch(startLoad());
  fetchSwagger('', bodyOne)
    .then((res) => {
      if ('id' in res) {
        const { id } = res;
        return Promise.resolve({ ...bodyOne, id });
      }
      return Promise.reject();
    })
    .then((data) => {
      dispatch(addOneData(data));
      dispatch(stopLoad());
    })
    .catch(() => {
      dispatch(stopLoad());
      errors(dispatch);
    });
});

export const delOneDataAsync = (bodyOne: ObjData) => ((dispatch: Dispatch): void => {
  dispatch(startLoad());
  fetchSwagger(bodyOne.id, null)
    .then((base) => {
      // console.log('delete=',data1);
      if ('id' in base) {
        return Promise.resolve({ ...bodyOne });
      }
      return Promise.reject();
    })
    .then((data) => {
      dispatch(delOneData(data));
      dispatch(stopLoad());
    })
    .catch(() => {
      dispatch(stopLoad());
      errors(dispatch);
    });
});

export const changeOneDataAsync = (bodyOne: ObjData) => ((dispatch: Dispatch): void => {
  dispatch(startLoad());
  fetchSwagger(bodyOne.id, bodyOne)
    .then((res) => {
      if ('id' in res) {
        return Promise.resolve({ ...bodyOne });
      }
      return Promise.reject();
    })
    .then((data) => {
      dispatch(changeOneData(data));
      dispatch(stopLoad());
    })
    .catch(() => {
      dispatch(stopLoad());
      errors(dispatch);
    });
});
