import {cardTemplate, formField} from './dom-elements.js';
import {avatarPreview} from './avatar.js';
import {housingType} from './type-settings.js';

export const addMarkerTooltip = (data) => {
  const nextCardElement = cardTemplate.cloneNode(true);


  const popupAvatar = nextCardElement.querySelector('.popup__avatar');

  if (typeof data.avatar === 'string') { // from get api
    data.avatar ? popupAvatar.src = data.avatar : popupAvatar.style.display = 'none';

  } else { // from submit
    if(!data.avatar) { // not selected
      popupAvatar.style.display = 'none';
    } else {
      popupAvatar.src = avatarPreview.src;
    }
  }

  const popupTitle = nextCardElement.querySelector('.popup__title');
  popupTitle.textContent = data.title;

  const popupAddress = nextCardElement.querySelector('.popup__text--address');
  popupAddress.textContent = data.address;

  const popupType =  nextCardElement.querySelector('.popup__type');
  popupType.textContent =  housingType[data.type];

  const popupTextPrice = nextCardElement.querySelector('.popup__text--price');
  popupTextPrice.textContent = `${data.price}  ₽/ночь`;

  const popupTextCapacity = nextCardElement.querySelector('.popup__text--capacity');
  popupTextCapacity.textContent = `${data.rooms} комнаты для ${data.capacity} гостей`;

  const popupTextTime = nextCardElement.querySelector('.popup__text--time');
  popupTextTime.textContent = `Заезд после ${data.timein}, выезд до ${data.timeout}`;

  const featureListElement = nextCardElement.querySelector('.popup__features');
  featureListElement.querySelectorAll('.popup__feature').forEach((element) => {

    const features = data.features || [];

    const modifiers = features.map((feature) => `popup__feature--${feature}`);

    if(!modifiers.includes(element.classList[1])) {
      element.remove();
    }
  });

  const popupDescription = nextCardElement.querySelector('.popup__description');
  popupDescription ? popupDescription.textContent = data.description : popupDescription.style.display = 'none';

  const photoListElement = nextCardElement.querySelector('.popup__photos');
  const imgField = photoListElement.querySelector('.popup__photo');

  if(!data.images) {
    imgField.remove();
  } else {
    if (Array.isArray(data.images)) { // from get api
      photoListElement.removeChild(imgField);
      const dataPhotos = data.images || [];
      if(dataPhotos.length > 0) {
        dataPhotos.forEach((src) => {
          imgField.src = src;
          photoListElement.appendChild(imgField.cloneNode());
        });
      }
    } else { // from submit
      const popupPhoto = nextCardElement.querySelector('.popup__photo');
      const popupPhotoList = nextCardElement.querySelector('.popup__photos');
      const allImgOfferPreview = formField.querySelectorAll('.ad-form__photo img');

      popupPhotoList.removeChild(popupPhoto);
      allImgOfferPreview.forEach((element) => {
        popupPhoto.src = element.src;
        popupPhotoList.appendChild(popupPhoto.cloneNode());
      });
    }
  }


  return nextCardElement;
};

