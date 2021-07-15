import {formField, mapFilterForm} from './dom-elements.js';

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
