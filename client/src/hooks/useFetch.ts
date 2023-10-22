import useSWR from 'swr';

export const useFetch = (
  url: string,
  fetcher: (url: string) => Promise<[]>
) => {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });

  return { data, error, isLoading };
};
