import { Redirect, Route, RouteProps } from 'react-router';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
} & RouteProps;

export default function ProtectedRoute2({isAuthenticated, ...routeProps}: ProtectedRouteProps) {
  if(isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={'/'} />;
  }
};