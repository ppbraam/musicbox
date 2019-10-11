import * as Router from 'react-router';
import { Home } from './pages';

interface RouteProps extends Router.RouteProps{
  key: string;
}

const Routes: RouteProps[] = [
  {
    component: Home,
    exact: true,
    key: 'home',
    path: '/',
  },
];


export default Routes;
