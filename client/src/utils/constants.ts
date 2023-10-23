export type dataType = {
  id: number;
  name: string;
  date: string;
};

export const baseUrl = 'http://127.0.0.1:5000/birthdays';

export const fetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed. ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};
