// import {formField} from './main.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const formField =  document.querySelector('.ad-form');
const formTitleInput = formField.querySelector('#title');
export const formPriceInput = formField.querySelector('#price');

formTitleInput.addEventListener('invalid', () => {
  if (formTitleInput.validity.tooShort) {
    formTitleInput.setCustomValidity ('Заголовок объявления должен состоять минимум из 30 символов');
  } else if (formTitleInput.validity.tooLong) {
    formTitleInput.setCustomValidity ('Заголовок объявления должен состоять максимум из 100 символов');
  } else if (formTitleInput.validity.valueMissing) {
    formTitleInput.setCustomValidity ('Обязательное поле');
  } else {
    formTitleInput.setCustomValidity ('');
  }
});

formTitleInput.addEventListener('input', () => {
  const valueLength = formTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    formTitleInput.setCustomValidity (`Ещё ${ MIN_TITLE_LENGTH - valueLength } символов.`);
  } else if  (valueLength > MAX_TITLE_LENGTH) {
    formTitleInput.setCustomValidity (`Удалите лишние ${ valueLength - MAX_TITLE_LENGTH } символов.`);
  } else {
    formTitleInput.setCustomValidity ('');
  }
  formTitleInput.reportValidity ();
});

formPriceInput.addEventListener('invalid', () => {
  if (formPriceInput.validity.valueMissing) {
    formPriceInput.setCustomValidity ('Обязательное поле');
  } else {
    formPriceInput.setCustomValidity ('');
  }
});

formPriceInput.addEventListener('input', () => {
  const priceValue = formPriceInput.value.length;
  if (priceValue > MAX_PRICE_VALUE) {
    formPriceInput.setCustomValidity('Максимальное значение поля 1 000 000.');
  } else {
    formPriceInput.setCustomValidity ('');
  }
  formTitleInput.reportValidity ();
});
