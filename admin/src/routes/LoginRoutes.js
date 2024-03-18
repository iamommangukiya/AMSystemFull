import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import TermsAndCondition from 'pages/terms&condition/TermsAndCondition';
import PrivacyPolicy from 'pages/terms&condition/PrivacyPolicy';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'terms_condition',
            element: <TermsAndCondition />
        },
        {
            path: 'privacy_policy',
            element: <PrivacyPolicy />
        }
    ]
};

export default LoginRoutes;
