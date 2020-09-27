import uniqStr from './uniqStr';
import { ObjData } from '../models';

function createFilterTypes(uniqListTagObj: ObjData[]): ObjData[] {
  const listNameTypes: string[] = uniqListTagObj.map((item) => item.name);
  const listNameTypesUniq: string[] = uniqStr(listNameTypes);
  window.console.log('listNameTypesUniq', listNameTypesUniq);
  const filtersType: ObjData[] = listNameTypesUniq.map((item) => ({ text: item, value: item } as ObjData));
  return filtersType;
}

export default createFilterTypes;
