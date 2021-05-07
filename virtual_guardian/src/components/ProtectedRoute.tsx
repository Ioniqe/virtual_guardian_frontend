import { Redirect, Route, RouteProps } from 'react-router';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  removeUser: () => void,
} & RouteProps;

export default function ProtectedRoute2({ isAuthenticated, removeUser, ...routeProps }: ProtectedRouteProps) {
  if (isAuthenticated) {
    return <Route {...routeProps}/>;
  } else {
    sessionStorage.removeItem('user'); //remove user id from session
    removeUser(); //remove user from storage
    return <Redirect to={'/'} />;
  }
};