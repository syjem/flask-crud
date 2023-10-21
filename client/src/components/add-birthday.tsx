import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldValues, useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { toast } from './ui/use-toast';

export const AddBirthday = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>();

  const submitHandler = async (data: FieldValues) => {
    return new Promise(() => {
      setTimeout(() => {
        reset();
        toast({
          title: 'You submitted the following values:',
          description: (
            <pre className="px-4 mt-2 w-full rounded-md bg-inherit">
              <code className="text-slate-950">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      }, 1000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[100px]">Add now</Button>
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
