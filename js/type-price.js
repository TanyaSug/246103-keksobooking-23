import {typeAndPrice} from './type-settings.js';

export const isPriceInvalid = (type, price) => {
  const nPrice = Number(price);
  return typeAndPrice[type] > nPrice;
};
