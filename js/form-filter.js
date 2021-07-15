const priceBreakPoints = {
  LOW: 10000,
  MIDDLE: 50000,
};

const HousingTypes = {
  any: 'any',
  low: 'low',
  middle: 'middle',
  high: 'high',
};

const isHousingFeaturesOk = (offer, housingFeatures) => {
  if (!Array.isArray(housingFeatures) || housingFeatures.length === 0) {
    return true;
  }
  return housingFeatures.every((filterFeature) => {
    const offerFeatures = offer.offer.features;
    if (!Array.isArray(offerFeatures) || offerFeatures.length === 0) {
      return false;
    }
    return offerFeatures.some((offerFeature) => filterFeature === offerFeature);
  });
};

const isHousingTypeOk = (offer, housingType) => {
  if (housingType === HousingTypes.any) {
    return true;
  }
  return housingType === offer.offer.type;
};

const isHousingPriceOk = (offer, housingPrice) => {
  switch (housingPrice) {
    case HousingTypes.any: return true;
    case HousingTypes.low: return offer.offer.price < priceBreakPoints.LOW;
    case HousingTypes.middle: return offer.offer.price < priceBreakPoints.MIDDLE && offer.offer.price >= priceBreakPoints.LOW;
    case HousingTypes.high: return offer.offer.price >= priceBreakPoints.MIDDLE;
    default: return false;
  }
};

const isHousingRoomsOk = (offer, housingRooms) => {
  if (housingRooms === HousingTypes.any) {
    return true;
  }
  // eslint-disable-next-line radix
  const value = Number.parseInt(housingRooms);
  return offer.offer.rooms ===value;
};

const isHousingGuestsOk = (offer, housingGuests) => {
  if (housingGuests === HousingTypes.any) {
    return true;
  }

  // eslint-disable-next-line radix
  const value = Number.parseInt(housingGuests);
  return offer.offer.guests === value;
};

const checkHousingFeatures = (offer, currentFilters) => isHousingFeaturesOk(offer, currentFilters['features']);

const checkHousingGuests = (offer, currentFilters) => {
  if (!isHousingGuestsOk(offer, currentFilters['housing-guests'])) {
    return false;
  }
  return checkHousingFeatures(offer, currentFilters);
};

const checkHousingRooms = (offer, currentFilters) => {
  if (!isHousingRoomsOk (offer, currentFilters['housing-rooms'])) {
    return false;
  }
  return checkHousingGuests(offer, currentFilters);
};

const checkHousingPrice = (offer, currentFilters) => {
  if (!isHousingPriceOk (offer, currentFilters['housing-price'])) {
    return false;
  }
  return checkHousingRooms(offer, currentFilters);
};

export const checkHousingType = (offer, currentFilters) => {
  if (!isHousingTypeOk (offer, currentFilters['housing-type'])) {
    return false;
  }
  return checkHousingPrice(offer, currentFilters);
};


