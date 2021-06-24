import {getOffer, getAuthor, getOfferTypes} from './data.js';


const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const cardElement= cardTemplate.cloneNode(true);


const mockOffer = getOffer();
const authorAvatar = getAuthor();
const offerTypes = getOfferTypes();

// Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas,
// чтобы проверить, что данные в разметку были вставлены корректно.
const popupTitle = cardElement.querySelector('.popup__title').cloneNode();
if (mockOffer.title) {
  popupTitle.textContent = mockOffer.title;
} else {
  popupTitle.style.display = 'none';
}
mapCanvas.appendChild(popupTitle);

const popupTextAddress = cardElement.querySelector('.popup__text--address');
if (mockOffer.address) {
  popupTextAddress.textContent = mockOffer.address;
} else {
  popupTextAddress.style.display = 'none';
}

const popupTextPrice = cardElement.querySelector('.popup__text--price');
if (mockOffer.price) {
  popupTextPrice.textContent = `${mockOffer.price}  ₽/ночь`;
} else {
  popupTextPrice.style.display = 'none';
}

const popupType = cardElement.querySelector('.popup__type');
if (mockOffer.type) {
  popupType.textContent = offerTypes[mockOffer.type];
} else {
  popupType.style.display = 'none';
}

const popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
if (mockOffer.rooms && mockOffer.guests) {
  popupTextCapacity.textContent = `${mockOffer.rooms} комнаты для ${mockOffer.guests} гостей`;
} else {
  popupTextCapacity.style.display = 'none';
}

const popupTextTime = cardElement.querySelector('.popup__text--time');
if (mockOffer.checkin && mockOffer.checkout) {
  popupTextTime.textContent = `Заезд после ${mockOffer.checkin}, выезд до ${mockOffer.checkout}`;
} else {
  popupTextTime.style.display = 'none';
}

const featureItems = cardElement.querySelectorAll('.popup__feature');
if (mockOffer.features && mockOffer.features.length > 0) {
  for (let idx = 0; idx <= featureItems.length - 1; idx++) {
    featureItems[idx].textContent = mockOffer.features[idx];
  }
}else {
  const featureList = cardElement.querySelector('.popup__features');
  featureList.style.display = 'none';
}


const popupDescription = cardElement.querySelector('.popup__description');
if (mockOffer.description) {
  popupDescription.textContent = mockOffer.description;
} else {
  popupDescription.style.display = 'none';
}

const photoList = cardElement.querySelector('.popup__photos');
if (mockOffer.photos && mockOffer.photos.length) {
  const removedPhoto = photoList.removeChild(photoList.firstElementChild);
  for (let idx = 0; idx <= mockOffer.photos.length - 1; idx++) {
    const clonedPhoto = removedPhoto.cloneNode();
    clonedPhoto.src = mockOffer.photos[idx];
    photoList.appendChild(clonedPhoto);
  }
} else {
  photoList.style.display = 'none';
}

const popupAvatar = cardElement.querySelector('.popup__avatar');
if (authorAvatar.avatar) {
  popupAvatar.src = authorAvatar.avatar;
} else {
  popupAvatar.style.display = 'none';
}


