import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProductDetails from 'pages/extra-pages/ProductDetails';
import Transaction from 'pages/extra-pages/Transaction';
import ShippingProduct from 'pages/extra-pages/ShippingProduct';
import ProviderProfile from 'pages/extra-pages/ProviderDetails';
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page

// render - utilities
const Users = Loadable(lazy(() => import('pages/extra-pages/Users')));
const Categories = Loadable(lazy(() => import('pages/extra-pages/Categories')));
const Providers = Loadable(lazy(() => import('pages/extra-pages/Providers')));
const Event = Loadable(lazy(() => import('pages/extra-pages/Event')));
const Profile = Loadable(lazy(() => import('pages/extra-pages/Profile')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'users',
            element: <Users />
        },
        {
            path: 'categories',
            element: <Categories />
        },
        {
            path: 'provider',
            element: <Providers />
        },
        {
            path: 'events',
            element: <Event />
        },
        {
            path: 'transaction',
            element: <Transaction />
        },
        {
            path: 'shippingproduct',
            element: <ShippingProduct />
        },
        {
            path: 'profile',
            element: <Profile />
        },
        {
            path: 'productdetails/:product_id',
            element: <ProductDetails />
        },
        {
            path: 'providerdetails/:profile_id',
            element: <ProviderProfile />
        }
    ]
};

export default MainRoutes;
