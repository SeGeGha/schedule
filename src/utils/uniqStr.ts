function uniqStr(list: string[]): string[] {
  const newList = [...list];
  newList.sort();
  let lastItem = '';
  const uniqList: string[] = [];
  newList.forEach((item: string) => {
    if (item !== lastItem) {
      uniqList.push(item);
      lastItem = item;
    }
  });
  return uniqList;
}

export default uniqStr;
