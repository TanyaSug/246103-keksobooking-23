/* eslint-disable */
import {clearLayer, showSingleMarker} from './map.js';

const maxAmountOfferMarkers = 10;

const PriceBreakPoints = {
  LOW: 10000,
  MIDDLE: 50000,
}
const isHousingFeaturesOk = (offer, housingFeatures) => {
  if (!Array.isArray(housingFeatures) || housingFeatures.length === 0) {
    return true;
  }
  return housingFeatures.every((filterFeature) => {
    const offerFeatures = offer.offer.features;
    if (!Array.isArray(offerFeatures) || offerFeatures.length === 0) {
      return false;
    }
    return offerFeatures.some((offerFeature) => filterFeature === offerFeature)
  })
};

const isHousingTypeOk = (offer, housingType) => {
  if (housingType === 'any') {
    return true;
  }
  return housingType === offer.offer.type;
};

const isHousingPriceOk = (offer, housingPrice) => {
  switch (housingPrice) {
    case 'any': return true;
    case 'low': return offer.offer.price < PriceBreakPoints.LOW;
    case 'middle': return offer.offer.price < PriceBreakPoints.MIDDLE && offer.offer.price >= PriceBreakPoints.LOW;
    case 'high': return offer.offer.price >= PriceBreakPoints.MIDDLE;
    default: return false;
  }
};

const isHousingRoomsOk = (offer, housingRooms) => {
  if (housingRooms ==='any') {
    return true;
  }
  const value = Number.parseInt(housingRooms);
  return offer.offer.rooms ===value;
};

const isHousingGuestsOk = (offer, housingGuests) => {
  if (housingGuests ==='any') {
    return true;
  }
  const value = Number.parseInt(housingGuests);
  return offer.offer.guests === value;
};


const checkHousingFeatures = (offer, currentFilters) => {
  if (!isHousingFeaturesOk(offer, currentFilters['features'])) {
    return false;
  }
  return true;
}

const checkHousingGuests = (offer, currentFilters) => {
  if (!isHousingGuestsOk(offer, currentFilters['housing-guests'])) {
    return false;
  }
  return checkHousingFeatures(offer, currentFilters)
}

const checkHousingRooms = (offer, currentFilters) => {
  if (!isHousingRoomsOk (offer, currentFilters['housing-rooms'])) {
    return false;
  }
  return checkHousingGuests(offer, currentFilters);
}

const checkHousingPrice = (offer, currentFilters) => {
  if (!isHousingPriceOk (offer, currentFilters['housing-price'])) {
  return false;
  }
  return checkHousingRooms(offer, currentFilters)
}

const checkHousingType = (offer, currentFilters) => {
  if (!isHousingTypeOk (offer, currentFilters['housing-type'])) {
    return false;
  }
  return checkHousingPrice(offer, currentFilters)
}

export const showOffersMarker = (allOffers, currentFilters = {}) => {
  clearLayer();

  allOffers
    .filter((offer) => checkHousingType(offer,currentFilters))
    .slice(0, maxAmountOfferMarkers)
    .forEach(showSingleMarker);
};





