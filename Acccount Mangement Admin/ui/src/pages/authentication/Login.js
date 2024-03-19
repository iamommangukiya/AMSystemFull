import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import { useState } from 'react';
import ForgetPassword from './auth-forms/ForgetPassword';

// ================================|| LOGIN ||================================ //

const Login = () => {
    const [forget, setforget] = useState(false);
    return (
        <AuthWrapper>
            {forget ? (
                <>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                                <Typography variant="h3">Forget Password</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <ForgetPassword
                                onForget={(e) => {
                                    setforget(false);
                                }}
                            />
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                            <Typography variant="h3">Login</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <AuthLogin
                            onForget={(e) => {
                                setforget(true);
                            }}
                        />
                    </Grid>
                </Grid>
            )}
        </AuthWrapper>
    );
};

export default Login;
