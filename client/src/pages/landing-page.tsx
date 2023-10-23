import { PostBirthday } from '@/https/post';
import { DataTable } from '@/components/data-table';
import { ToggleTheme } from '@/components/toggle-theme';

const LandingPage = () => {
  return (
    <article className="max-w-7xl mx-auto py-8 text-black dark:text-slate-100 p-4">
      <div className="flex justify-end mb-8">
        <ToggleTheme />
      </div>
      <section className="max-w-2xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-950 dark:text-slate-100 font-bold">
          Birthdays
        </h1>
        <PostBirthday />
      </section>
      <DataTable />
    </article>
  );
};

export default LandingPage;
