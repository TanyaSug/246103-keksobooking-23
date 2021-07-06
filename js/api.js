import {showMessageBlock} from './form.js';
import {createOfferMarker} from './map.js';
import {initialCoordinates} from './data.js';


export const bindFormApi = (formField, mapFilterForm, mainPinMarker) => {
  formField.addEventListener('submit', (evt) => {
    console.log('we are here');
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
