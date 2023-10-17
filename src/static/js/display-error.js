export const displayError = (inputElement, errorMessage) => {
  const errorElement = document.createElement('p');
  errorElement.classList.add('error');
  errorElement.innerText = errorMessage;
  inputElement.closest('.input__container').appendChild(errorElement);
};
