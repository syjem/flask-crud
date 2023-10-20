export const displayError = (inputElement: Element, errorMessage: string) => {
  const errorElement = document.createElement('p');
  errorElement.classList.add('error');
  errorElement.innerText = errorMessage;

  if (inputElement) {
    inputElement.closest('.input__container').appendChild(errorElement);
  }
};
