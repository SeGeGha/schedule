import { ObjData } from './data.model';

export type ObjState = {
  dataBase: ObjData[],
  uniqTypesObj: ObjData[],
  filterTypes: ObjData[],
  loading: boolean,
  errorReq: boolean,
};
