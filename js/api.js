import {showMessageBlock} from './message-block.js';
import {createOfferMarker} from './map.js';
import {initialCoordinates} from './user-form.js';


export const bindFormApi = (formField, mapFilterForm, mainPinMarker) => {
  formField.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createOfferMarker(mainPinMarker);
    const formData = new FormData(evt.target);

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
