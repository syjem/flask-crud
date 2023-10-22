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
