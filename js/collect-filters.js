import {getCurrentFeatures} from './get-current-filters.js';

export const collectCurrentFilters = (currentFilters, featuresInp, selectedFilters) => {
  currentFilters.features = getCurrentFeatures(featuresInp);
  [...selectedFilters].reduce((accum, elem) => {
    accum[elem.name] = elem.value;
    return accum;
  }, currentFilters);
};
