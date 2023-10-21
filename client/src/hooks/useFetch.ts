import { fetchBirthdays } from '@/components/fetchAll';
import useSWR from 'swr';

export const useFetch = () => {
  const url = 'http://127.0.0.1:5000/birthdays';
  const { data, error, isLoading } = useSWR(url, fetchBirthdays);

  return { data, error, isLoading };
};
