const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const formField =  document.querySelector('.ad-form');
const formTitleInput = formField.querySelector('#title');

formTitleInput.addEventListener('invalid', () => {
  if (formTitleInput.validity.tooShort) {
    formTitleInput.setCustomValidity ('Заголовок обьявления должен состоять минимум из 30 символов');
  } else if (formTitleInput.validity.tooLong) {
    formTitleInput.setCustomValidity ('Заголовок обьявления должен состоять максимум из 100 символов');
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
    formTitleInput.setCustomValidity (`Удалити лишние ${ valueLength - MAX_TITLE_LENGTH } символов.`);
  } else {
    formTitleInput.setCustomValidity ('');
  }
  formTitleInput.reportValidity ();
});

const formPriceInput = formField.querySelector('#price');

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

const roomNumber = formField.querySelector('#room_number');
const capacity = formField.querySelector('#capacity');
// const capasityOptions = capacity.querySelectorAll('option');

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


const typeAndPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const formTypeSelect = formField.querySelector('#type');
const getMinPrise = () => typeAndPrice[formTypeSelect.value];

formTypeSelect.addEventListener('change', () => {
  formPriceInput.setAttribute('min', getMinPrise());
  formPriceInput.setAttribute('placeholder', getMinPrise());
});

// Координаты центра Токио
const addressField = formField.querySelector('#address');
const addressFieldValue = {
  lat: 35.68950,
  lng: 139.69171,
};
addressField.setAttribute('value', `${addressFieldValue.lat} ${addressFieldValue.lng}`);
