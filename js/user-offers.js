/* eslint-disable */
//  import {createNewCard} from './card.js';
// import {initialCoordinates} from "./data";
import {addMarkerTooltip} from './card.js';
import {map} from './map.js';
import {getUserOffers} from './api.js';

const maxAmountOfferMarkers = 10;



const isHousingTypeOk = (_offer, _housingType) => true;
const isHousingPriceOk = (_offer, _housingPrice) => true;
const isHousingRoomsOk = (_offer, _housingRooms) => true;
const isHousingGuestsOk = (_offer, _housingGuests) => true;
const isHousingFeaturesOk = (_offer, _housingFeatures) => true;


const showOffersMarker = (allOffers, currentFilters) => {
  const {
    housingType,
    housingPrice,
    housingRooms,
    housingGuests,
    housingFeatures,
  }
  = currentFilters;

  allOffers.filter ((offer) => {
    if (!isHousingTypeOk (offer, housingType)) {
      return false;
    }
    if (!isHousingPriceOk (offer, housingPrice)) {
      return false;
    }
    if (!isHousingRoomsOk (offer, housingRooms)) {
      return false;
    }
    if (!isHousingGuestsOk (offer, housingGuests)) {
      return false;
    }
    if (!isHousingFeaturesOk (offer, housingFeatures)) {
      return false;
    }
    return true;
  })
    .slice (0, maxAmountOfferMarkers)
    // .forEach((offer) => {
    //   const sameOfferIcon =  L.icon({
    //     iconUrl: 'img/pin.svg',
    //     iconSize: [40, 40],
    //     iconAnchor: [20, 40],
    //   });
    //   const sameOfferMarker = L.marker({
    //     lat: offer.location.lat,
    //     lng: offer.location.lng,
    //   },
    //   {
    //     icon: sameOfferIcon,
    //   },
    //   );
    //   sameOfferMarker
    //     .addTo(map)
    //     .bindPopup(addMarkerTooltip(offer),
    //       {
    //         keepInView: true,
    //       },
    //     );
    // })
};
export {showOffersMarker};

getUserOffers()
  .then ((offers) => {
    offers.forEach((offer) => {
      const sameOfferIcon =  L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });
      const sameOfferMarker = L.marker({
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: sameOfferIcon,
      },
      );
      sameOfferMarker
        .addTo(map)
        .bindPopup(addMarkerTooltip(offer),
          {
            keepInView: true,
          },
        );
    })
  })

