import React, { useContext, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Button, FormHelperText, Grid, Link, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from '../../../../node_modules/react-router-dom/dist/index';
import { DomainContext } from 'App';
import { BASE_URL } from 'Configration';

const ForgetPassword = (props) => {
    const baseUrl = useContext(DomainContext);
    const [pageview, setpageview] = useState('forget');
    const navigate = useNavigate();

    const [buttonLoad, setbuttonLoad] = useState(false);

    const [email, setemail] = useState('');

    // ------------------------Otp Validation------------------------

    const [otperr, setotperr] = useState(false);
    const [otpvalue, setotpvalue] = useState({ n1: '', n2: '', n3: '', n4: '' });
    const otpBox = [useRef(), useRef(), useRef(), useRef()];

    const otpchange = (e, a) => {
        if (e.target.value.length > 0) {
            const kkey = `n${a + 1}`;
            setotpvalue({ ...otpvalue, [kkey]: e.target.value });
            otpBox[a + 1] && otpBox[a + 1].current.focus();
        }
    };

    const otpkeydown = (e, a) => {
        if ((e.target.value == '' && e.key == 'Backspace') || e.key == 'Delete') {
            const kkey = `n${a}`;
            setotpvalue({ ...otpvalue, [kkey]: '' });
            a - 1 >= 0 && otpBox[a - 1].current.focus();
        } else if ((a == 3 && e.key == 'Backspace') || e.key == 'Delete') {
            const kkey = `n${a + 1}`;
            setotpvalue({ ...otpvalue, [kkey]: '' });
        }
    };

    const otpValidation = () => {
        const isotp = parseInt(`${otpvalue.n1}${otpvalue.n2}${otpvalue.n3}${otpvalue.n4}`);

        const otpdata = new FormData();
        otpdata.append('email_address', email);
        otpdata.append('otp', isotp);
        try {
            fetch(`${BASE_URL}/admin/admin_verify_otp`, {
                method: 'POST',
                headers: {},
                body: otpdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setbuttonLoad(false);
                    if (data.success) {
                        setpageview('changepassword');
                        setotperr(false);
                    } else {
                        setotperr(true);
                    }
                });
        } catch (err) {
            setbuttonLoad(false);
            console.log(err);
        }
    };

    // -------------------------Reset Password-----------------------------

    const [password, setpassword] = useState({ confirmpass: '', newpass: '' });
    const [passerr, setpasserr] = useState({ confirmpass: '', newpass: '' });

    const changeInput = (e) => {
        const { name, value } = e.target;
        setpassword({ ...password, [name]: value });
    };

    const changepassword = () => {
        let verify = true;
        let error = passerr;

        if (password.newpass == '') {
            error = { ...error, newpass: 'Please enter Newpassword' };
            verify = false;
        } else {
            error = { ...error, newpass: '' };
            verify = true;
        }

        if (password.confirmpass == '') {
            error = { ...error, confirmpass: 'Please enter Confirmpassword' };
            verify = false;
        } else if (password.newpass != password.confirmpass) {
            error = { ...error, confirmpass: 'Password and Confirmpassword not match' };
            verify = false;
        } else {
            error = { ...error, confirmpass: '' };
            verify = true;
        }

        setpasserr(error);

        if (verify) {
            const resetpass = new FormData();
            resetpass.append('email_address', email);
            resetpass.append('password', password.confirmpass);
            try {
                fetch(`${BASE_URL}/admin/admin_reset_password`, {
                    method: 'POST',
                    headers: {},
                    body: resetpass
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setbuttonLoad(false);
                        if (data.success) {
                            window.location.reload();
                        }
                    });
            } catch (err) {
                setbuttonLoad(false);
                console.log(err);
            }
        } else {
            setbuttonLoad(false);
        }
    };
    return (
        <>
            {pageview == 'forget' ? (
                <>
                    <Formik
                        initialValues={{
                            email: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            const forget = new FormData();
                            forget.append('email_address', values.email);
                            try {
                                await fetch(`${BASE_URL}/admin/admin_send_otp`, {
                                    method: 'POST',
                                    headers: {},
                                    body: forget
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data.success) {
                                            setemail(values.email);
                                            setpageview('otp');
                                        } else {
                                            setErrors({ submit: data.message });
                                        }
                                    });
                            } catch (err) {
                                console.log(err);
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                            <OutlinedInput
                                                id="email-login"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter email address"
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    {errors.submit && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Grid>
                                    )}
                                    <Grid item xs={12} className="loginbotton">
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="mb-3"
                                            >
                                                Send OTP
                                            </Button>
                                        </AnimateButton>
                                        <div className="text-center" style={{ cursor: 'pointer' }}>
                                            <Link className="m-0" onClick={() => props.onForget()}>
                                                Back To login
                                            </Link>
                                        </div>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </>
            ) : (
                <>
                    {pageview == 'otp' ? (
                        <>
                            <p>Please enter OTP</p>
                            <form
                                className="l_form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setbuttonLoad(true);
                                    otpValidation();
                                }}
                            >
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="rx-input otp-input"
                                        maxLength="1"
                                        value={otpvalue.n1}
                                        ref={otpBox[0]}
                                        onChange={(e) => otpchange(e, 0)}
                                        onKeyUp={(e) => otpkeydown(e, 0)}
                                    />
                                    <input
                                        type="text"
                                        className="rx-input otp-input"
                                        maxLength="1"
                                        value={otpvalue.n2}
                                        ref={otpBox[1]}
                                        onChange={(e) => otpchange(e, 1)}
                                        onKeyUp={(e) => otpkeydown(e, 1)}
                                    />
                                    <input
                                        type="text"
                                        className="rx-input otp-input"
                                        maxLength="1"
                                        value={otpvalue.n3}
                                        ref={otpBox[2]}
                                        onChange={(e) => otpchange(e, 2)}
                                        onKeyUp={(e) => otpkeydown(e, 2)}
                                    />
                                    <input
                                        type="text"
                                        className="rx-input otp-input"
                                        maxLength="1"
                                        value={otpvalue.n4}
                                        ref={otpBox[3]}
                                        onChange={(e) => otpchange(e, 3)}
                                        onKeyUp={(e) => otpkeydown(e, 3)}
                                    />
                                </div>
                                {otperr && (
                                    <>
                                        <p className="err" style={{ marginLeft: '0px', marginTop: '15px', color: 'red' }}>
                                            Plese enter Valid OTP
                                        </p>
                                    </>
                                )}
                                <Grid item xs={12} className="loginbotton mt-5">
                                    <AnimateButton>
                                        {buttonLoad ? (
                                            <>
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className="mb-3"
                                                    style={{ backgroundColor: '#cdcdcd' }}
                                                >
                                                    Submit
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className="mb-3"
                                                >
                                                    Submit
                                                </Button>
                                            </>
                                        )}
                                    </AnimateButton>
                                    <div className="text-center" style={{ cursor: 'pointer' }}>
                                        <Link className="m-0" onClick={() => props.onForget()}>
                                            Back To login
                                        </Link>
                                    </div>
                                </Grid>
                            </form>
                        </>
                    ) : (
                        <>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setbuttonLoad(true);
                                    changepassword();
                                }}
                            >
                                <label htmlFor="new-password">New Password</label>
                                <div className="mb-3">
                                    <input
                                        id="new-password"
                                        style={{ width: '100%', outline: 'none', border: '1px solid #d1d1d1', padding: '10px' }}
                                        className="rounded-2 mt-1 mb-1"
                                        placeholder="New Password"
                                        type="password"
                                        name="newpass"
                                        value={password.newpass}
                                        onChange={changeInput}
                                    />
                                    {passerr.newpass != '' && (
                                        <>
                                            <p className="err mb-0" style={{ marginLeft: '0px', color: 'red' }}>
                                                {passerr.newpass}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <div className="mb-4">
                                    <input
                                        id="confirm-password"
                                        style={{ width: '100%', outline: 'none', border: '1px solid #d1d1d1', padding: '10px' }}
                                        className="rounded-2 mt-1 mb-1"
                                        placeholder="Confirm Password"
                                        type="password"
                                        name="confirmpass"
                                        value={password.confirmpass}
                                        onChange={changeInput}
                                    />
                                    {passerr.confirmpass != '' && (
                                        <>
                                            <p className="err mb-0" style={{ marginLeft: '0px', marginTop: '0', color: 'red' }}>
                                                {passerr.confirmpass}
                                            </p>
                                        </>
                                    )}
                                </div>
                                <div className="loginbotton">
                                    {buttonLoad ? (
                                        <>
                                            <Button
                                                disableElevation
                                                fullWidth
                                                size="large"
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                style={{ backgroundColor: '#cdcdcd' }}
                                            >
                                                Change Password
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                disableElevation
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Change Password
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </form>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default ForgetPassword;
