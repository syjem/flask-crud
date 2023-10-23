import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { baseUrl as url } from '@/utils/constants';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export const PostBirthday = () => {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button asChild>
          <Link to="/birthday/new">Add Birthday</Link>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="dark:text-slate-100">
            Add birthday
          </DialogTitle>
          <DialogDescription>Add your birthday here.</DialogDescription>
        </DialogHeader>
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
            <DialogClose asChild>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-[100px] border-slate-400 bg-slate-100">
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-[100px] flex gap-2 items-center"
              disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
