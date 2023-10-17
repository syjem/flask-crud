export const submitBirthday = async (data) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/birthdays', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const parsedData = await response.json();
      console.log('Server response:', parsedData);
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
