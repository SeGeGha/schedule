/* eslint-disable @typescript-eslint/no-unsafe-return */
import uniqStr from './uniqStr';
import { ObjData } from '../models';

function createUniqTypesObj(baseData: ObjData[]): ObjData[] {
  const typesAll: string[] = baseData
    .map((record: ObjData) => record.type)
    .filter((item: string) => item[0] === '{');
  window.console.log(typesAll);

  const uniqListTagStr: string[] = uniqStr(typesAll);
  window.console.log('uniq', uniqListTagStr);

  const uniqListTagObj: ObjData[] = uniqListTagStr
    .map((item: string): ObjData => JSON.parse(item));
  window.console.log('uniqObj', uniqListTagObj);
  return uniqListTagObj;
}

export default createUniqTypesObj;
