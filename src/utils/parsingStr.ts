/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
function parsingStr<T>(str: string|undefined, errorObj: T, defaultObj?: T|null): T|null {
  let obj: T|null;
  if (!str) {
    obj = (defaultObj === undefined) ? errorObj : defaultObj;
  } else {
    try {
      obj = JSON.parse(str);
    } catch (e) {
      obj = errorObj;
    }
  }
  return obj;
}

export default parsingStr;
