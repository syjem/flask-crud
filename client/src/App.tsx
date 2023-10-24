import { lazy, Suspense } from 'react';
import LandingPage from './pages/landing-page';
import UpdateBirthdayPage from '@/https/patch';
import { Toaster } from './components/ui/toaster';
import FallbackSkeleton from './components/skeleton';
import { ThemeProvider } from '@/theme/theme-provider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AddBirthday = lazy(() => import('@/https/post'));

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/birthday/new',
      element: <AddBirthday />,
    },
    {
      path: '/:id/:name/:date/update',
      element: <UpdateBirthdayPage />,
    },
  ]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={<FallbackSkeleton />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
