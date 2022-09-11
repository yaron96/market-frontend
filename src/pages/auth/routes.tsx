import { Navigate } from 'react-router';
import { paths } from "shared/lib/paths";

import { SignInPage } from './sing-in';
import { SignUpPage } from './sign-up';

export const authRoutes = () => [
  {
    path: paths.signIn(),
    element: <SignInPage />,
  },
  {
    path: paths.signUp(),
    element: <SignUpPage />,
  },
  {
    path: paths.auth(),
    element: <Navigate to={paths.signIn()} />,
  },
  {
    path: '*',
    element: <Navigate to={paths.notFound()} />,
  },
]