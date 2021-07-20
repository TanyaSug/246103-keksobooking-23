import {formField} from './dom-elements.js';

const IMG_OFFER_SIZE = {
  width: 70,
  height: 70,
};

const imgFileChooser = formField.querySelector('#images');
const imgOfferPreview = formField.querySelector('.ad-form__photo');
const imgContainer = formField.querySelector('.ad-form__photo-container');

const clearImgOfferPreview = () => {
  const allImgOfferPreview = formField.querySelectorAll('.ad-form__photo');
  Array.from(allImgOfferPreview).forEach((element) => {
    if (element.children.length === 0) {
      element.remove();
    }
  });
};

export const showImgOfferPreview = () => {

  imgFileChooser.addEventListener('change', (evt) => {

    const addNewImages = (result) => {
      const clonedDiv =  imgOfferPreview.cloneNode(true);

      const newImg = document.createElement('img');
      newImg.src = result;
      newImg.width = IMG_OFFER_SIZE.width;
      newImg.height = IMG_OFFER_SIZE.height;

      clonedDiv.append(newImg);
      imgContainer.append(clonedDiv);

      clearImgOfferPreview();
    };

    const files = evt.target.files;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event) => {
        addNewImages(event.target.result);
      });
    });
  });
};

export const clearHousingPhotos = () => {
  const allImgOfferPreview = formField.querySelectorAll('.ad-form__photo');

  if (allImgOfferPreview.length > 0) {
    allImgOfferPreview.forEach((element, index) => {
      if (index === 0) {
        const img = element.querySelector('img');
        if(img !== null) {
          element.removeChild(img);
        }
      } else {
        element.remove();
      }
    });
  }
};
