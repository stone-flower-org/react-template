export const beautifyNumber = (number: number, devider = ' ') =>
  number.toLocaleString('en-US').split(',').join(devider);
