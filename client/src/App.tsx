import LandingPage from './pages/landing-page';
import { Toaster } from './components/ui/toaster';
import UpdateBirthdayPage from './https/patch';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme/theme-provider';

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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
