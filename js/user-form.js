import {timeInSelect,timeOutSelect,  formPriceInput, formAddress, formTypeSelect, roomNumberSelect, capacitySelect} from './dom-elements.js';
import {initialCoordinates} from './initial-coords.js';
import {typeAndPrice} from './type-settings.js';
import {isPriceInvalid} from './type-price.js';

export const  defaultPricePlaceholder = typeAndPrice.house;
const roomNumberValue = '100';

const getMinPrise = (type) => typeAndPrice[type];
const onTimeChange = (evt) => {
  timeOutSelect.value = timeInSelect.value = evt.target.value;
};

// match and disable rooms numbers with guests number
roomNumberSelect.addEventListener('change',   () =>{
  if (roomNumberSelect.value === roomNumberValue) {
    [...capacitySelect.children].forEach((element) => {
      element.disabled = true;
    });
    capacitySelect.children[capacitySelect.children.length - 1].disabled = false;
    capacitySelect.children[capacitySelect.children.length - 1].selected = true;
  } else {
    [...capacitySelect.children].forEach((element, idx) => {
      element.disabled = idx >= roomNumberSelect.value;
    });
    capacitySelect.children[0].selected = true;
  }
});

// match and limit time in and time out
timeInSelect.addEventListener('change', onTimeChange);
timeOutSelect.addEventListener('change', onTimeChange);

// reset price value and placeholder, validate type and price fields
formTypeSelect.addEventListener('change', (evt) => {
  formPriceInput.placeholder = getMinPrise(evt.target.value);

  if (isPriceInvalid(formTypeSelect.value, formPriceInput.value)) {
    formTypeSelect.setCustomValidity('');
    formPriceInput.setCustomValidity('');
  } else {
    formTypeSelect.setCustomValidity('Выбранный тип жилья и цена не согласованы');
    formPriceInput.setCustomValidity('Выбранный тип жилья и цена не согласованы');
  }
});

// set address value
formAddress.setAttribute('value', `широта: ${initialCoordinates.lat} долгота: ${initialCoordinates.lng}`);


