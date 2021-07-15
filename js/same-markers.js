import {clearLayer, showSingleMarker} from './map.js';
import {checkHousingType} from './form-filter.js';

const MAX_MARKERS_AMOUNT = 10;

export const showOffersMarker = (allOffers, currentFilters = {}) => {
  clearLayer();

  allOffers
    .filter((offer) => checkHousingType(offer,currentFilters))
    .slice(0, MAX_MARKERS_AMOUNT)
    .forEach(showSingleMarker);
};
