import {formField} from './dom-elements.js';

const IMG_OFFER_SIZE = {
  width: 70,
  height: 70,
};
// const AVATAR_PREVIEW_SIZE = {
//   width: 40,
//   height: 44,
// };
const currentAvatarPreview = 'img/muffin-grey.svg';
// const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const avatarFileChooser = formField.querySelector('#avatar');
export const avatarPreview = formField.querySelector('#preview');
const imgFileChooser = formField.querySelector('#images');
const imgOfferPreview = formField.querySelector('.ad-form__photo');
export const allImgOfferPreview = formField.querySelectorAll('.ad-form__photo');
const imgContainer = formField.querySelector('.ad-form__photo-container');

export const showAvatarPreview = () => {
  avatarFileChooser.addEventListener('change', () => {
    const file = avatarFileChooser.files[0];
    // const fileName = file.name.toLowerCase();
    //
    // const matches = FILE_TYPES.some((it) => {
    //   fileName.endsWith(it);
    // });
    // if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      avatarPreview.src = evt.target.result;
      // avatarPreview.width = AVATAR_PREVIEW_SIZE.width;
      // avatarPreview.height = AVATAR_PREVIEW_SIZE.height;
    });
    reader.readAsDataURL(file);
  });
};

const clearImgOfferPreview = () => {

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

const clearHousingPhotos = () => {
  imgOfferPreview.remove();
};

export const resetAvatarAndImgOfferPreview = () => {
  clearHousingPhotos();
  avatarPreview.src = currentAvatarPreview;
};
