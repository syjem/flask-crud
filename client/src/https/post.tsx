import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { baseUrl as url } from '@/utils/constants';
import { FieldValues, useForm } from 'react-hook-form';

const PostBirthday = () => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>();

  const submitHandler = async (data: FieldValues) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Resource not found.');
        }
        throw new Error(`Request failed. ${response.status}`);
      }

      const serverData = await response.json();
      const success = serverData.success;
      const error = serverData.error;

      if (success || error) {
        toast({
          variant: success ? 'success' : 'error',
          description: success ? serverData.success : serverData.error,
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Fetch error:', error);
      toast({
        title: 'Request Failed',
        variant: 'error',
        description: 'Something went wrong with the request.',
      });
    }
    reset();
  };

  return (
    <article className="max-w-7xl mx-auto space-y-4 py-16 text-black dark:text-slate-100 p-4">
      <section className="max-w-md mx-auto space-y-6 border dark:border-slate-800 p-10 rounded-md shadow-md">
        <div>
          <h1 className="text-center sm:text-left text-slate-950 dark:text-slate-100 text-2xl sm:text-3xl font-bold">
            Add birthday
          </h1>
          <p className="text-center sm:text-left text-slate-500 dark:text-slate-400  text-sm">
            Add your birthday here.
          </p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col space-y-5 dark:text-slate-200">
          <div className="flex flex-col space-y-5">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name" className="w-fit">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                autoComplete="off"
                className="border-slate-500 dark:border-slate-400"
                {...register('name', {
                  required: 'This field is required.',
                  minLength: {
                    value: 3,
                    message: 'Please enter at least 3 characters.',
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 dark:text-red-600 text-xs italic">
                  {`${errors.name.message}`}
                </p>
              )}
            </div>
            <div className="grid flex-1 gap-2">
              <Label htmlFor="date" className="w-fit">
                Date
              </Label>
              <Input
                type="date"
                id="date"
                className="border-slate-500 dark:border-slate-400"
                {...register('date', {
                  required: 'Please enter a valid date.',
                })}
              />
              {errors.date && (
                <p className="text-red-500 dark:text-red-600 text-xs italic">
                  {`${errors.date.message}`}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-5">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-[100px] border-slate-400 bg-slate-100">
              Close
            </Button>
            <Button
              type="submit"
              className="w-[100px] flex gap-2 items-center"
              disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Add
            </Button>
          </div>
        </form>
      </section>
    </article>
  );
};

export default PostBirthday;
