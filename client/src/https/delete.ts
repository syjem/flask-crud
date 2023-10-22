import { toast } from '@/components/ui/use-toast';
import { url } from '@/https/get';

export const deleteData = async (id: number) => {
  try {
    const ID = { id: id };
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ID),
    });
    if (response.ok) {
      const data = await response.json();
      const success = data.success;

      toast({
        variant: 'error',
        description: success ? data.success : data.error,
      });
    } else {
      throw new Error(`Request failed. ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};
