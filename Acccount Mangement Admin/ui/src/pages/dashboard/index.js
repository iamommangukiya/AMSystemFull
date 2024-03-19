import { useState } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { useEffect } from 'react';
import { useContext } from 'react';
import { DomainContext } from 'App';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';
import { activeItem } from 'store/reducers/menu';
import { BASE_URL } from 'Configration';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));

    const baseUrl = useContext(DomainContext);

    const navigate = useNavigate();

    // const [counter, setcounter] = useState({ users: 0, categories: 0, products: 0, events: 0, wallet: 0, shipping_post: 0 });
    const [counter, setcounter] = useState({ users: 0, provider: 0, event: 0, payment: 0 });

    if (!token?.is_login && !token?.is_login == true) {
        navigate('/login');
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(activeItem({ openItem: ['dashboard'] }));
        if (token?.is_login && token?.is_login == true) {
            try {
                fetch(`${BASE_URL}/admin/admin_dashboard`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    },
                    body: ''
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            setcounter(data.data);

                            // try {
                            //     fetch(`${BASE_URL}/categories/category_list`, {
                            //         method: 'POST',
                            //         headers: {
                            //             Authorization: `Bearer ${token.token}`
                            //         },
                            //         body: ''
                            //     })
                            //         .then((response) => response.json())
                            //         .then((data) => {
                            //             localStorage.setItem('synp_categories', JSON.stringify(data.data));
                            //         });
                            // } catch (err) {
                            //     console.log(err);
                            // }
                            const userList = new FormData();
                            userList.append('user_type', 'user');

                            try {
                                fetch(`${BASE_URL}/user_details/user_List`, {
                                    method: 'POST',
                                    headers: {
                                        Authorization: `Bearer ${token.token}`
                                    },
                                    body: userList
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        localStorage.setItem('ad_users', JSON.stringify(data.data));
                                    });
                            } catch (err) {
                                console.log(err);
                            }

                            const providerList = new FormData();
                            providerList.append('user_type', 'provider');

                            try {
                                fetch(`${BASE_URL}/user_details/user_List`, {
                                    method: 'POST',
                                    headers: {
                                        Authorization: `Bearer ${token.token}`
                                    },
                                    body: providerList
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        localStorage.setItem('ad_providers', JSON.stringify(data.data));
                                    });
                            } catch (err) {
                                console.log(err);
                            }

                            // try {
                            //     fetch(`${baseUrl.apiBase}/post_detail/all_post_list`, {
                            //         method: 'POST',
                            //         headers: {
                            //             Authorization: `Bearer ${token.token}`
                            //         },
                            //         body: ''
                            //     })
                            //         .then((response) => response.json())
                            //         .then((data) => {
                            //             if (data.success) {
                            //                 localStorage.setItem('synp_products', JSON.stringify(data.data));
                            //             }
                            //         });
                            // } catch (err) {
                            //     console.log(err);
                            // }

                            // try {
                            //     fetch(`${baseUrl.apiBase}/event_detail/all_event_list`, {
                            //         method: 'POST',
                            //         headers: {
                            //             Authorization: `Bearer ${token.token}`
                            //         },
                            //         body: ''
                            //     })
                            //         .then((response) => response.json())
                            //         .then((data) => {
                            //             if (data.success) {
                            //                 localStorage.setItem('synp_events', JSON.stringify(data.data));
                            //             }
                            //         });
                            // } catch (err) {
                            //     console.log(err);
                            // }

                            // try {
                            //     fetch(`${baseUrl.apiBase}/payment_history/transaction_history`, {
                            //         method: 'POST',
                            //         headers: {
                            //             Authorization: `Bearer ${token?.token}`
                            //         },
                            //         body: ''
                            //     })
                            //         .then((response) => response.json())
                            //         .then((data) => {
                            //             if (data.success) {
                            //                 localStorage.setItem('synp_transaction', JSON.stringify(data.data));
                            //             }
                            //         });
                            // } catch (err) {
                            //     console.log(err);
                            // }
                        } else if (data.message == 'Authentication failed.') {
                            navigate('/login');
                        }
                    });
            } catch (err) {}
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count={counter.users} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Providers" count={counter.provider} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Events" count={counter.event} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Payment" count={counter.payment} />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Wallet balance" count={counter.wallet} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Shipping Products" count={counter.shipping_post} />
            </Grid> */}

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
    );
};

export default DashboardDefault;
