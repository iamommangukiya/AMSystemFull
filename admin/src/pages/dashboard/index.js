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
import { BASE_URL, BASE_URL1 } from 'Configration';
import { Axios } from '../../../node_modules/axios/index';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));

    const baseUrl = useContext(DomainContext);

    const navigate = useNavigate();

    // const [counter, setcounter] = useState({ users: 0, categories: 0, products: 0, events: 0, wallet: 0, shipping_post: 0 });
    const [counter, setcounter] = useState({ users: 0, company: 0, event: 0, payment: 0, ActiveUser: 0, pending: 0 });

    if (!token?.is_login && !token?.is_login == true) {
        navigate('/login');
    }
    const countuser = async (data) => {
        const activeUsersCount = await data.filter((user) => user.status === 'active').length;
        setcounter((prevState) => ({
            ...prevState,
            ActiveUser: activeUsersCount
        }));
    };
    const pendinguser = async (data) => {
        const activeUsersCount = await data.filter((user) => user.status === 'pending').length;
        setcounter((prevState) => ({
            ...prevState,
            pending: activeUsersCount
        }));
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(activeItem({ openItem: ['dashboard'] }));
        if (token?.is_login && token?.is_login == true) {
            try {
                try {
                    fetch(`${BASE_URL1}/allcmp`, {
                        method: 'POST'
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            setcounter((prevState) => ({
                                ...prevState,
                                company: data.data.length
                            }));
                            console.log(data.data.length);
                        });
                } catch (err) {
                    console.log(err);
                }
                fetch(`${BASE_URL1}/featchUsers`, {
                    method: 'get'
                })
                    .then((response) => response.json())
                    .then((data) => {
                        pendinguser(data.data);
                        countuser(data.data);
                        setcounter((prevState) => ({ ...prevState, users: data.data.length }));
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
                <AnalyticEcommerce title="Total Company" count={counter.company} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Active users" count={counter.ActiveUser} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total requests" count={counter.pending} />
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
