import {typeAndPrice} from './type-price-settings.js';

export const validateTypePrice = (type, price) => {
  const nPrice = Number (price);
  return typeAndPrice[type] <= nPrice;
};
