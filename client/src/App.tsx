import LandingPage from './pages/landing-page';
import { Toaster } from './components/ui/toaster';
import UpdateBirthdayPage from './pages/update-page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/birthday/new',
      element: <LandingPage />,
    },
    {
      path: '/:id/:name/:date/update',
      element: <UpdateBirthdayPage />,
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
