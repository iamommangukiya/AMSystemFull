import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Modal, Alert } from 'antd';

// assets
import { EyeOutlined, LogoutOutlined, UnlockOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { DomainContext } from 'App';
import { BASE_URL } from 'Configration';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ handleLogout }) => {
    const theme = useTheme();
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));

    const baseUrl = useContext(DomainContext);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [ChangepasswordModal, setChangepasswordModal] = useState(false);

    const [password, setpassword] = useState({ confirmpass: '', newpass: '', oldpass: '' });
    const [passerr, setpasserr] = useState({ confirmpass: '', newpass: '', oldpass: '' });

    const changeInput = (e) => {
        const { name, value } = e.target;
        setpassword({ ...password, [name]: value });
    };
    const [popup, setpopup] = useState({ show: false, message: '', success: true });

    const changepassword = () => {
        let verify = true;
        let error = passerr;

        if (password.oldpass == '') {
            error = { ...error, oldpass: 'Please enter Password' };
            verify = false;
        } else if (password.oldpass.length < 6) {
            error = { ...error, oldpass: 'Password length must be at least 6 characters long' };
            verify = false;
        } else {
            error = { ...error, oldpass: '' };
            verify = true;
        }

        if (password.newpass == '') {
            error = { ...error, newpass: 'Please enter Newpassword' };
            verify = false;
        } else if (password.newpass.length < 6) {
            error = { ...error, newpass: 'Password length must be at least 6 characters long' };
            verify = false;
        } else {
            error = { ...error, newpass: '' };
            verify = true;
        }

        if (password.confirmpass == '') {
            error = { ...error, confirmpass: 'Please enter Confirmpassword' };
            verify = false;
        } else if (password.confirmpass.length < 6) {
            error = { ...error, confirmpass: 'Password length must be at least 6 characters long' };
            verify = false;
        } else if (password.newpass != password.confirmpass) {
            error = { ...error, confirmpass: 'Password and Confirm password not match' };
            verify = false;
        } else {
            error = { ...error, confirmpass: '' };
            verify = true;
        }
        setpasserr(error);

        if (verify) {
            const changepass = new FormData();
            changepass.append('old_password', password.oldpass);
            changepass.append('new_password', password.confirmpass);
            try {
                fetch(`${BASE_URL}/admin/admin_change_password`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token.token}` },
                    body: changepass
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setpopup({ show: true, message: data.message, success: data.success });
                        if (data.success) {
                            setChangepasswordModal(false);
                            setpassword({ confirmpass: '', newpass: '', oldpass: '' });
                        } else {
                            if (data.message == 'Your current password is incorrect, please try again') {
                                setpasserr({ ...error, oldpass: 'Wrong Password' });
                            } else if (
                                data.message == 'Your new password is similar to your current password, please try another password'
                            ) {
                                setpasserr({ ...error, confirmpass: 'Your new password is similar to your current password.' });
                            }
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
        }
    };

    return (
        <>
            <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
                <ListItemButton
                    selected={selectedIndex === 0}
                    style={{ backgroundColor: '#fff' }}
                    onClick={(event) => {
                        setChangepasswordModal(true);
                        setfomikrander(['def']);
                    }}
                >
                    <ListItemIcon>
                        <UnlockOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Change Password" />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>

            <Modal
                title="Change Password"
                centered
                open={ChangepasswordModal}
                onCancel={() => {
                    setChangepasswordModal(false);
                    setpassword({ confirmpass: '', newpass: '', oldpass: '' });
                    setpasserr({ confirmpass: '', newpass: '', oldpass: '' });
                }}
                footer={''}
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        changepassword();
                    }}
                >
                    <div className="mb-3">
                        <label htmlFor="old-password">Old Password</label>
                        <input
                            id="old-password"
                            style={{ width: '100%', outline: 'none', border: '1px solid #d1d1d1', padding: '10px' }}
                            className="rounded-2 mt-1"
                            placeholder="Old Password"
                            type="password"
                            name="oldpass"
                            value={password.oldpass}
                            onChange={changeInput}
                        />
                        {passerr.oldpass != '' && (
                            <>
                                <p className="err mb-0" style={{ marginLeft: '0px', color: 'red' }}>
                                    {passerr.oldpass}
                                </p>
                            </>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="new-password">New Password</label>
                        <input
                            id="new-password"
                            style={{ width: '100%', outline: 'none', border: '1px solid #d1d1d1', padding: '10px' }}
                            className="rounded-2 mt-1 "
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
                    <div className="mb-4">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            id="confirm-password"
                            style={{ width: '100%', outline: 'none', border: '1px solid #d1d1d1', padding: '10px' }}
                            className="rounded-2 mt-1 "
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmpass"
                            value={password.confirmpass}
                            onChange={changeInput}
                        />
                        {passerr.confirmpass != '' && (
                            <>
                                <p className="err mb-0" style={{ marginLeft: '0px', color: 'red' }}>
                                    {passerr.confirmpass}
                                </p>
                            </>
                        )}
                    </div>
                    <div className="loginbotton">
                        <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                            Change Password
                        </Button>
                    </div>
                </form>
            </Modal>
            {/* {popup.show && (
                <Alert
                    message={popup?.message}
                    type={popup?.success ? 'success' : 'error'}
                    showIcon
                    style={{ position: 'fixed', right: '15px', bottom: '30px' }}
                />
            )} */}
        </>
    );
};

ProfileTab.propTypes = {
    handleLogout: PropTypes.func
};

export default ProfileTab;
