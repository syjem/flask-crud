export const fetchBirthdays = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/birthdays');
    if (!response.ok) {
      console.log('Server error.');
    }
    const birthdays = await response.json();
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    birthdays.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
              <td>${item.name}</td>
              <td class="td-date">${item.date}</td>
          `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Request failed');
  }
};
