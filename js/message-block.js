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
    messageTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  }

  const messageBlock = messageTemplate.cloneNode(true);
  document.body.append(messageBlock);

  if (!isSuccess && errorText) {
    document.querySelector('.error__message').textContent = errorText;
  }

  const handleEscape = (evt) => {
    if ( evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeMessageBlock(messageBlock);
      document.removeEventListener('keydown', handleEscape);
    }
  };

  document.addEventListener('keydown', handleEscape);

  const handleClick = () => {
    closeMessageBlock(messageBlock);
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);
};
