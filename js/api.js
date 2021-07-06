import {showMessageBlock} from './form.js';
import {createOfferMarker, mainPinMarker} from './map.js';
import {initialCoordinates} from './data.js';

const formField = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');

formField.addEventListener('submit', (evt) => {
  evt.preventDefault();
  createOfferMarker();
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

