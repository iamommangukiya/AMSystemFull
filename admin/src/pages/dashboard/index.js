import { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activeItem } from 'store/reducers/menu';
import axios from 'axios';
import { DomainContext } from 'App';
import { BASE_URL, BASE_URL1 } from 'Configration';

const DashboardDefault = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const baseUrl = useContext(DomainContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [counter, setCounter] = useState({ users: 0, provider: 0, event: 0, payment: 0 });
    let len = 0;

    if (!token?.is_login && !token?.is_login === true) {
        navigate('/login');
    }

    useEffect(() => {
        dispatch(activeItem({ openItem: ['dashboard'] }));
        if (token?.is_login && token?.is_login === true) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `${BASE_URL1}/featchUsers`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token.token}`
                            }
                        }
                    );
                    const data = response.data;

                    setCounter((prevCounter) => ({ ...prevCounter, users: data.data.length }));

                    const userList = new FormData();
                    userList.append('user_type', 'user');

                    const providerList = new FormData();
                    providerList.append('user_type', 'provider');

                    const [userData, providerData] = await Promise.all([
                        axios.post(`${BASE_URL1}/featchUsers`, userList, {
                            headers: {
                                Authorization: `Bearer ${token.token}`
                            }
                        }),
                        axios.post(`${BASE_URL1}/featchUsers`, providerList, {
                            headers: {
                                Authorization: `Bearer ${token.token}`
                            }
                        })
                    ]);

                    localStorage.setItem('ad_users', JSON.stringify(userData.data.data));
                    localStorage.setItem('ad_providers', JSON.stringify(providerData.data.data));
                } catch (err) {
                    console.log(err);
                }
            };
            const fetchCmp = async () => {
                try {
                    const response = await axios.get(
                        `${BASE_URL1}/company`,
                        {},
                        {
                            headers: {
                                auth_token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNzEwNzM1NTU0fQ.zWWJVpQ9OmwrOf7VOYnmeAlhV-TCTiW4oMR0DYTdajs`
                            }
                        }
                    );
                    const data = response.data;

                    setCounter((prevCounter) => ({ ...prevCounter, provider: data.data.length }));

                    const userList = new FormData();
                    userList.append('user_type', 'user');

                    const providerList = new FormData();
                    providerList.append('user_type', 'provider');

                    const [userData, providerData] = await Promise.all([
                        axios.post(`${BASE_URL1}/featchUsers`, userList, {
                            headers: {
                                Authorization: `Bearer ${token.token}`
                            }
                        }),
                        axios.post(`${BASE_URL1}/featchUsers`, providerList, {
                            headers: {
                                Authorization: `Bearer ${token.token}`
                            }
                        })
                    ]);

                    localStorage.setItem('ad_users', JSON.stringify(userData.data.data));
                    localStorage.setItem('ad_providers', JSON.stringify(providerData.data.data));
                } catch (err) {
                    console.log(err);
                }
            };

            fetchData();
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
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
    );
};

export default DashboardDefault;
