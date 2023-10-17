import { fetchBirthdays } from './get-birthdays.js';
import { submitBirthday } from './submit-birthday.js';
import { displayError } from './display-error.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const name = document.querySelector('input[name=name]');
  const date = document.querySelector('input[type=date]');
  const inputContainer = document.querySelectorAll('.input__container');

  fetchBirthdays();

  const errors = {
    required: 'This field is required.',
    minLength: 'Minimum is 3 characters.',
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset any previous error messages
    inputContainer.forEach((item) => {
      item.querySelector('.error')?.remove();
    });

    const nameValue = name.value;
    const dateValue = date.value;

    if (nameValue === '') {
      displayError(name, errors.required);
    } else if (nameValue.length < 3) {
      displayError(name, errors.minLength);
    }

    if (dateValue === '') {
      displayError(date, errors.required);
    }

    if (nameValue === '' || dateValue === '') {
      return;
    }

    const data = {
      name: nameValue,
      date: dateValue,
    };

    submitBirthday(data);
    fetchBirthdays();

    // Reset the input fields
    name.value = '';
    date.value = '';
  });
});
