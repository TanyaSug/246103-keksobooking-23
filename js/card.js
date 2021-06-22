import {getOffer, getAuthor, getOfferTypes} from './data.js';


const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const cardElement= cardTemplate.cloneNode(true);


const OFFER = getOffer();
const AVATAR = getAuthor();
const OFFERTYPES = getOfferTypes();

// Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas,
// чтобы проверить, что данные в разметку были вставлены корректно.
const popupTitle = cardElement.querySelector('.popup__title').cloneNode();
if (OFFER.title) {
  popupTitle.textContent = OFFER.title;
} else {
  popupTitle.style.display = 'none';
}
mapCanvas.appendChild(popupTitle);

const popupTextAddress = cardElement.querySelector('.popup__text--address');
if (OFFER.address) {
  popupTextAddress.textContent = OFFER.address;
} else {
  popupTextAddress.style.display = 'none';
}

const popupTextPrice = cardElement.querySelector('.popup__text--price');
if (OFFER.price) {
  popupTextPrice.textContent = `${OFFER.price}  ₽/ночь`;
} else {
  popupTextPrice.style.display = 'none';
}

const popupType = cardElement.querySelector('.popup__type');
if (OFFER.type) {
  popupType.textContent = OFFERTYPES[OFFER.type];
} else {
  popupType.style.display = 'none';
}

const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
if (OFFER.rooms && OFFER.guests) {
  popupTextCapacity.textContent = `${OFFER.rooms} комнаты для ${OFFER.guests} гостей`;
} else {
  popupTextCapacity.style.display = 'none';
}

const popupTextTime = cardElement.querySelector('.popup__text--time');
if (OFFER.checkin && OFFER.checkout) {
  popupTextTime.textContent = `Заезд после ${OFFER.checkin}, выезд до ${OFFER.checkout}`;
} else {
  popupTextTime.style.display = 'none';
}

const featureItems = cardElement.querySelectorAll('.popup__feature');
if (OFFER.features && OFFER.features.length > 0) {
  for (let idx = 0; idx <= featureItems.length - 1; idx++) {
    featureItems[idx].textContent = OFFER.features[idx];
  }
}else {
  const featureList = cardElement.querySelector('.popup__features');
  featureList.style.display = 'none';
}


const popupDescription = cardElement.querySelector('.popup__description');
if (OFFER.description) {
  popupDescription.textContent = OFFER.description;
} else {
  popupDescription.style.display = 'none';
}

const photoList = cardElement.querySelector('.popup__photos');
if (OFFER.photos && OFFER.photos.length) {
  const removedPhoto = photoList.removeChild(photoList.firstElementChild);
  for (let idx = 0; idx <= OFFER.photos.length - 1; idx++) {
    const clonedPhoto = removedPhoto.cloneNode();
    clonedPhoto.src = OFFER.photos[idx];
    photoList.appendChild(clonedPhoto);
  }
} else {
  photoList.style.display = 'none';
}

const popupAvatar = cardElement.querySelector('.popup__avatar');
if (AVATAR.avatar) {
  popupAvatar.src = AVATAR.avatar;
} else {
  popupAvatar.style.display = 'none';
}


