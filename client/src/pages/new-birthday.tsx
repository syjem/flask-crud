import { toast } from '@/components/ui/use-toast';
import { url } from '@/hooks/useData';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewBirthday = () => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>();

  const submitHandler = async (data: FieldValues) => {
    try {
      console.log(`Data to be submitted: ${JSON.stringify(data)}`);
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed. ${response.status}`);
      }

      const serverData = await response.json();
      console.log(`Server response: ${JSON.stringify(serverData)}`);
      toast({
        title: 'Server response:',
        description: JSON.stringify(serverData),
      });
    } catch (error) {
      console.error(error);
    }
    reset();
    navigate('/');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Birthday</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add birthday</DialogTitle>
          <DialogDescription>Add your birthday here.</DialogDescription>
        </DialogHeader>
        <form
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-5">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name" className="w-fit">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                autoComplete="off"
                className="border-slate-500"
                {...register('name', {
                  required: 'This field is required.',
                  minLength: {
                    value: 3,
                    message: 'Name field accept only at least 3 characters.',
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
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
                className="border-slate-500"
                {...register('date', {
                  required: 'Please enter a valid date.',
                })}
              />
              {errors.date && (
                <p className="text-red-500 text-xs italic">
                  {`${errors.date.message}`}
                </p>
              )}
            </div>
          </div>
          {!errors && <Button>Error</Button>}
          <Button
            type="submit"
            className="self-end w-[100px] flex gap-2 items-center"
            disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBirthday;
