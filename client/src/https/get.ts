import { useFetch } from '@/hooks/useFetch';
import { useState, useEffect } from 'react';
import { dataType } from '@/utils/constants';
import { fetcher, baseUrl as url } from '@/utils/constants';

export const useData = () => {
  const { data } = useFetch(url, fetcher);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (data) {
      const birthday = data.map((person: dataType) => {
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
