const closeMessageBlock = (messageBlock) => {
  messageBlock.remove();
};

export const showMessageBlock = (isSuccess, errorText) => {
  let messageTemplate;

  if (isSuccess) {
    messageTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  } else {
    // if isSuccess undefined
    messageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  }

  const messageBlock = messageTemplate.cloneNode(true);
  document.body.append(messageBlock);

  // if error dialog and we want to replace the error text
  if (!isSuccess && errorText) {
    document.querySelector('.error__message').textContent = errorText;
  }

  let screenClickHandler = null;

  const escapePressedHandler = (evt) => {
    if ( evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      if (typeof screenClickHandler === 'function') {
        screenClickHandler();
      }
    }
  };

  screenClickHandler = () => {
    closeMessageBlock(messageBlock);
    document.removeEventListener('click', screenClickHandler);
    document.removeEventListener('keydown', escapePressedHandler);
  };

  document.addEventListener('keydown', escapePressedHandler);
  document.addEventListener('click', screenClickHandler);
};
