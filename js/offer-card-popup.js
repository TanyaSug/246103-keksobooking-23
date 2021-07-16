import {cardTemplate, formTitleInput, formAddress, formPriceInput, formTypeSelect, roomNumberSelect,formField, capacitySelect, timeInSelect, timeOutSelect} from './dom-elements.js';


export const createUserOfferPopup = () => {
  const cardElement = cardTemplate.cloneNode(true);
  const popupTitle = cardElement.querySelector('.popup__title');

  if (formTitleInput.value) {
    popupTitle.textContent = formTitleInput.value;
  } else {
    popupTitle.style.display = 'none';
  }

  const popupTextAddress = cardElement.querySelector('.popup__text--address');
  if (formAddress.value) {
    popupTextAddress.textContent = formAddress.value;
  } else {
    popupTextAddress.style.display = 'none';
  }

  const popupTextPrice = cardElement.querySelector('.popup__text--price');
  if (formPriceInput.value) {
    popupTextPrice.textContent = `${formPriceInput.value}  ₽/ночь`;
  } else {
    popupTextPrice.style.display = 'none';
  }
  const popupType = cardElement.querySelector('.popup__type');
  if (formTypeSelect.value) {
    popupType.textContent = formTypeSelect.value;
  } else {
    popupType.style.display = 'none';
  }

  const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  if (roomNumberSelect.value && capacitySelect.value) {
    popupTextCapacity.textContent = `${roomNumberSelect.value} комнаты для ${capacitySelect.value} гостей`;
  } else {
    popupTextCapacity.style.display = 'none';
  }
  const popupTextTime = cardElement.querySelector('.popup__text--time');
  if (timeInSelect.value && timeOutSelect.value) {
    popupTextTime.textContent = `Заезд после ${timeInSelect.value}, выезд до ${timeOutSelect.value}`;
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
  cardFeatureElements.forEach((element) => {
    const modifier = element.classList[1];
    if (!modifiers.includes(modifier)) {
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

export const addMarkerTooltip = (data) => {
  const nextCardElement = cardTemplate.cloneNode(true);

  nextCardElement.querySelector('.popup__avatar').src = data.author.avatar ;
  nextCardElement.querySelector('.popup__title').textContent = data.offer.title;
  nextCardElement.querySelector('.popup__type').textContent = data.offer.type;
  nextCardElement.querySelector('.popup__text--price').textContent = `${data.offer.price}  ₽/ночь`;
  nextCardElement.querySelector('.popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;
  nextCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

  const featureListElement = nextCardElement.querySelector('.popup__features');
  featureListElement.querySelectorAll('.popup__feature').forEach((element) => {
    const features = data.offer.features || [];

    const modifiers = features.map((feature) => `popup__feature--${feature}`);

    if(!modifiers.includes(element.classList[1])) {
      element.remove();
    }
  });

  nextCardElement.querySelector('.popup__description').textContent = data.offer.description;
  nextCardElement.querySelector('.popup__photos').textContent = data.offer.photos;

  return nextCardElement;
};

