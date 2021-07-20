import {formField} from './dom-elements.js';
import {clearHousingPhotos} from './housing-photos.js';

const currentAvatarPreview = 'img/muffin-grey.svg';

export const avatarPreview = formField.querySelector('#preview');
const avatarFileChooser = formField.querySelector('#avatar');

export const showAvatarPreview = () => {
  avatarFileChooser.addEventListener('change', () => {
    const file = avatarFileChooser.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
      avatarPreview.src = evt.target.result;

    });
    reader.readAsDataURL(file);
  });
};

export const resetAvatarAndImgOfferPreview = () => {
  clearHousingPhotos();
  avatarPreview.src = currentAvatarPreview;
};
