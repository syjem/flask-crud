import { Skeleton } from '@/components/ui/skeleton';

const FallbackSkeleton = () => {
  return (
    <article className="max-w-7xl mx-auto space-y-4 py-16 p-4">
      <section className="max-w-md mx-auto space-y-6 p-10 rounded-md border dark:border-slate-800 shadow-md">
        <div className="space-y-2">
          <Skeleton className="w-[50%] h-6 rounded-md"></Skeleton>
          <Skeleton className="w-[70%] h-4 rounded-md"></Skeleton>
        </div>
        <div className="flex flex-col gap-4 mx-auto">
          <div className="space-y-2">
            <Skeleton className="w-[80px] h-4 rounded-md"></Skeleton>
            <Skeleton className="w-full h-6 rounded-md"></Skeleton>
          </div>
          <div className="space-y-2">
            <Skeleton className="w-[80px] h-4 rounded-md"></Skeleton>
            <Skeleton className="w-full h-6 rounded-md"></Skeleton>
          </div>
          <div className="flex items-center justify-end gap-5">
            <Skeleton className="w-[100px] h-6 rounded-md"></Skeleton>
            <Skeleton className="w-[100px] h-6 rounded-md"></Skeleton>
          </div>
        </div>
      </section>
    </article>
  );
};

export default FallbackSkeleton;
