import { PostBirthday } from '@/https/post';
import { DataTable } from '@/components/data-table';

const LandingPage = () => {
  return (
    <article className="max-w-2xl mx-auto py-20 text-black dark:text-slate-100 p-4">
      <section className="flex items-center justify-between mb-4">
        <h1 className="text-slate-950 dark:text-slate-100 text-5xl font-bold">
          Birthdays
        </h1>
        <PostBirthday />
      </section>
      <DataTable />
    </article>
  );
};

export default LandingPage;
