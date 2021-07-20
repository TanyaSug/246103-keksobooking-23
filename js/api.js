import {showMessageBlock} from './message-block.js';
import {createOfferMarker} from './map.js';
import {initialCoordinates} from './initial-coords.js';
import {formPriceInput} from './dom-elements.js';
import {resetAvatarAndImgOfferPreview} from './avatar.js';
import {hidePopup} from './map.js';
import {defaultPricePlaceholder} from './user-form.js';

export const submitForm = (formField, mapFilterForm, mainPinMarker, runFiltering) => {
  formField.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    createOfferMarker(mainPinMarker);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          showMessageBlock(true);
          mainPinMarker.setLatLng({
            lat: initialCoordinates.lat,
            lng: initialCoordinates.lng,
          });
          formField.reset();
          mapFilterForm.reset();
          resetAvatarAndImgOfferPreview();
          hidePopup();
          formPriceInput.placeholder = defaultPricePlaceholder;
          runFiltering();
        }else {
          showMessageBlock(false);
        }
      })
      .catch(() => {
        showMessageBlock(false);
      });
  });
};

export const getUserOffers = () => fetch(
  'https://23.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .catch((err) => {
    throw new Error(err);
  });
