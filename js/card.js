import {formField} from './main.js';


const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createNewCard = () => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = formField.querySelector('#title');
  const popupTitle = cardElement.querySelector('.popup__title');
  if (cardTitle.value) {
    popupTitle.textContent = cardTitle.value;
  } else {
    popupTitle.style.display = 'none';
  }
  const cardAddress = formField.querySelector('#address');
  const popupTextAddress = cardElement.querySelector('.popup__text--address');
  if (cardAddress.value) {
    popupTextAddress.textContent = cardAddress.value;
  } else {
    popupTextAddress.style.display = 'none';
  }
  const cardPrice = formField.querySelector('#price');
  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  if (cardPrice.value) {
    popupTextPrice.textContent = `${cardPrice.value}  ₽/ночь`;
  } else {
    popupTextPrice.style.display = 'none';
  }
  const cardType = formField.querySelector('#type');
  const popupType = cardElement.querySelector('.popup__type');
  if (cardType.value) {
    popupType.textContent = cardType.value;
  } else {
    popupType.style.display = 'none';
  }
  const cardRoom =  formField.querySelector('#room_number');
  const cardGuest = formField.querySelector('#capacity');

  const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  if (cardRoom.value && cardGuest.value) {
    popupTextCapacity.textContent = `${cardRoom.value} комнаты для ${cardGuest.value} гостей`;
  } else {
    popupTextCapacity.style.display = 'none';
  }
  const cardCheckin = formField.querySelector('#timein');
  const cardCheckout = formField.querySelector('#timeout');
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  if (cardCheckin.value && cardCheckout.value) {
    popupTextTime.textContent = `Заезд после ${cardCheckin.value}, выезд до ${cardCheckout.value}`;
  } else {
    popupTextTime.style.display = 'none';
  }

  const formFeatureList = formField.querySelector('.features');
  const featureElements = formFeatureList.querySelectorAll('.features__checkbox');

  const features = Array.from(featureElements)
    .filter((evt) => evt.checked)
    .map((evt) => evt.value);

  const featureListElement = cardElement.querySelector('.popup__features');
  const cardFeatureElements = featureListElement.querySelectorAll('.popup__feature');

  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  cardFeatureElements.forEach((element) =>{
    const modifier = element.classList[1];
    if (! modifiers.includes(modifier)) {
      element.remove();
    }
  });

  const cardDescription = formField.querySelector('#description');
  const popupDescription = cardElement.querySelector('.popup__description');
  if (cardDescription.value) {
    popupDescription.textContent = cardDescription.value;
  } else {
    popupDescription.style.display = 'none';
  }

  const photoList = cardElement.querySelector('.popup__photos');
  photoList.style.display = 'none';


  const popupAvatar = cardElement.querySelector('.popup__avatar');
  popupAvatar.style.display = 'none';

  return cardElement;
};

const addMarkerTooltip = (data) => {
  const nextCardElement = cardTemplate.cloneNode(true);

  nextCardElement.querySelector('.popup__avatar').src = data.author.avatar ;
  nextCardElement.querySelector('.popup__title').textContent = data.offer.title;
  nextCardElement.querySelector('.popup__type').textContent = data.offer.type;
  nextCardElement.querySelector('.popup__text--price').textContent = `${data.offer.price}  ₽/ночь`;
  nextCardElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  nextCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  nextCardElement.querySelector('.popup__feature').textContent = data.offer.features;
  nextCardElement.querySelector('.popup__description').textContent = data.offer.description;
  nextCardElement.querySelector('.popup__photos').textContent = data.offer.photos;
  return nextCardElement;
};
export {createNewCard, addMarkerTooltip};
