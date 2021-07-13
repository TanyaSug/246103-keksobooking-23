import {formField} from './dom-elements.js';
import {formPriceInput} from  './form-validation.js';
import {initialCoordinates} from './initial-coords.js';
import {typeAndPrice} from './type-price-settings.js';
import {validateTypePrice} from './type-price.js';

const roomNumber = formField.querySelector('#room_number');
const capacity = formField.querySelector('#capacity');

roomNumber.addEventListener('change',   () =>{
  if (roomNumber.value === '100') {
    for (let idx = 0; idx < capacity.children.length; idx++) {
      capacity.children[idx].disabled = false;
    }
    capacity.children[capacity.children.length - 1].disabled = false;
    capacity.children[capacity.children.length - 1].selected = true;
  } else {
    for (let idx = 0; idx < capacity.children.length; idx++) {
      if (idx < roomNumber.value) {
        capacity.children[idx].disabled = false;
      } else {
        capacity.children[idx].disabled = true;
      }
    }
    capacity.children[0].selected = true;
  }
});

const timeInSelect = formField.querySelector('#timein');
const timeOutSelect = formField.querySelector('#timeout');
const onTimeChange = function (evt) {
  timeOutSelect.value = timeInSelect.value = evt.target.value;
};
timeInSelect.addEventListener('change', onTimeChange);
timeOutSelect.addEventListener('change', onTimeChange);


export const formTypeSelect = formField.querySelector('#type');
const getMinPrise = () => typeAndPrice[formTypeSelect.value];

formTypeSelect.addEventListener('change', () => {
  // formPriceInput.setAttribute('min', getMinPrise());
  formPriceInput.setAttribute('placeholder', getMinPrise());
  if (validateTypePrice(formTypeSelect.value, formPriceInput.value)) {
    formTypeSelect.setCustomValidity('');
    formPriceInput.setCustomValidity('');
  } else {
    formTypeSelect.setCustomValidity('Выбранный тип жилья и цена не согласованы');
    formPriceInput.setCustomValidity('Выбранный тип жилья и цена не согласованы');
  }
  formTypeSelect.reportValidity();
});

// Координаты центра Токио
export const addressField = formField.querySelector('#address');
addressField.setAttribute('value', `широта: ${initialCoordinates.lat} долгота: ${initialCoordinates.lng}`);


// Функция которая переключает страницу из активного состояния в неактивное и наоборот
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterElements = Array.from(mapFilterForm.children);
const formElements = Array.from(formField.children);
export const toggleFormsCondition = (disabled) => {
  if (disabled) {
    formField.classList.add('ad-form--disabled');
    mapFilterForm.classList.add('map__filters--disabled');
    formElements.forEach(
      (element) => {
        element.setAttribute('disabled', disabled);
      });
    mapFilterElements.forEach(
      (element) => {
        element.setAttribute('disabled', disabled);
      });
  }else {
    formField.classList.remove('ad-form--disabled');
    mapFilterForm.classList.remove('map__filters--disabled');
    formElements.forEach(
      (element) => {
        element.removeAttribute('disabled');
      });
    mapFilterElements.forEach(
      (element) => {
        element.removeAttribute('disabled');
      });
  }
};
toggleFormsCondition(true);


// reset form data

// const formFieldReset = formField.querySelector('.ad-form__reset');
// formFieldReset.addEventListener('click', () => {
//   formField.reset();
//   mapFilterForm.reset();
// });


