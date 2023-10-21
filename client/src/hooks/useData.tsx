import { useFetch } from '@/hooks/useFetch';
import { useState, useEffect } from 'react';

export type personType = {
  id: number;
  name: string;
  date: string;
};

export const useData = () => {
  const { data } = useFetch();
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
      setUsersData(birthday);
    }
  }, [data]);

  return usersData;
};
