import { useFetch } from '@/hooks/useFetch';
import { useState, useEffect } from 'react';

export type personType = {
  id: number;
  name: string;
  date: string;
};

export const url = 'http://127.0.0.1:5000/birthdays';
const fetcher = async (url: string) => {
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

export const useData = () => {
  const { data } = useFetch(url, fetcher);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (data) {
      const birthday = data.map((person: personType) => {
        const { id, name, date } = person;
        return {
          id: id,
          name: name,
          date: date,
        };
      });
      setUsersData(birthday as never);
    }
  }, [data]);

  return usersData;
};
