import useSWR from 'swr';

export const useFetch = (
  url: string,
  fetcher: (url: string) => Promise<[]>
) => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return { data, error, isLoading };
};
