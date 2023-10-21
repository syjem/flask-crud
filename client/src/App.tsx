import { AddBirthday } from './components/add-birthday';
import { DataTableDemo } from './components/data-table';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <article className="max-w-2xl mx-auto py-20 text-black p-4">
        <AddBirthday />
        <DataTableDemo />
      </article>
      <Toaster />
    </>
  );
}

export default App;
