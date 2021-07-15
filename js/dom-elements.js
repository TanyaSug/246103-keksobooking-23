export const formField = document.querySelector('.ad-form');
export const mapFilterForm = document.querySelector('.map__filters');
export const canvas = document.querySelector('#map-canvas');
export const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const formPriceInput = formField.querySelector('#price');
export const formTitleInput = formField.querySelector('#title');
export const formAddress = formField.querySelector('#address');
export const formTypeSelect = formField.querySelector('#type');

export const roomNumberSelect = formField.querySelector('#room_number');
export const capacitySelect = formField.querySelector('#capacity');
export const timeInSelect = formField.querySelector('#timein');
export const timeOutSelect = formField.querySelector('#timeout');

export const filterSelects = mapFilterForm.querySelectorAll('select');
export const featuresInputs = mapFilterForm.querySelectorAll('input[name=features]');


