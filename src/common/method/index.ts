export const propsToStyle = (arrStyle: Array<any>) => {
  return arrStyle.filter(
    x => x !== undefined && !Object.values(x).some(v => v === undefined),
  );
};
