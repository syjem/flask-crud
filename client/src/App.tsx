import { Toaster } from './components/ui/toaster';
import Home from './pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewBirthday from './pages/new-birthday';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/birthday/new',
      element: <NewBirthday />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
