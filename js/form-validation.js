import {
  isPriceInvalid
} from './type-price.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

export const initializeFormTitleInput = (formTitleInput) => {
  formTitleInput.addEventListener('invalid', () => {
    if (formTitleInput.validity.valueMissing) {
      formTitleInput.setCustomValidity('Обязательное поле');
    }
  });

  formTitleInput.addEventListener('input', () => {
    const valueLength = formTitleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      formTitleInput.setCustomValidity(`Ещё ${ MIN_TITLE_LENGTH - valueLength } символов.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      formTitleInput.setCustomValidity(`Удалите лишние ${ valueLength - MAX_TITLE_LENGTH } символов.`);
    } else {
      formTitleInput.setCustomValidity('');
    }
    formTitleInput.reportValidity();
  });
};

export const initializePriceTypeValidators = (formPriceInput, formTypeSelect) => {
  formPriceInput.addEventListener('invalid', () => {
    if (formPriceInput.validity.valueMissing) {
      formPriceInput.setCustomValidity('Обязательное поле');
    }
  });

  formPriceInput.addEventListener('input', () => {
    if (isPriceInvalid(formTypeSelect.value, formPriceInput.value)) {
      formPriceInput.setCustomValidity('Выбранный тип жилья и цена не согласованы');
    } else {
      formPriceInput.setCustomValidity('');
    }

    formPriceInput.reportValidity();
  });
};
