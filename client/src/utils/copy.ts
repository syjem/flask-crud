import { toast } from '@/components/ui/use-toast';

const clipboard = (data: string) => {
  navigator.clipboard.writeText(data);
  toast({
    variant: 'success',
    description: 'Copied to clipboard.',
  });
};

export default clipboard;
