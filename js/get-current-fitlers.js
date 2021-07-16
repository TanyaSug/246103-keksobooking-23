export const getCurrentFeatures = (featuresInp) => [...featuresInp]
  .filter((element) => element.checked)
  .map((element) => element.value);
