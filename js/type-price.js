import {typeAndPrice} from './type-settings.js';

export const isPriceValid = (type, price) => {
  const nPrice = Number(price);
  return typeAndPrice[type] < nPrice;
};
