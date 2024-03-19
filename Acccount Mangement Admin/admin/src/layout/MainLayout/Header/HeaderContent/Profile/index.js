import PropTypes from 'prop-types';
import { useContext, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';

// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import ProfileLogo from 'assets/images/logo.png';
import { Modal, Button, Alert } from 'antd';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../../../../node_modules/react-router-dom/dist/index';
import { DomainContext } from 'App';
import { BASE_URL } from 'Configration';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `profile-tab-${index}`,
        'aria-controls': `profile-tabpanel-${index}`
    };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
    const theme = useTheme();
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const baseUrl = useContext(DomainContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            fetch(`${BASE_URL}/admin/admin_logout`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: ''
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate('/login');
                });
        } catch (err) {
            console.log(err);
        }
    };

    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const iconBackColorOpen = 'grey.300';

    const [logoutModal, setlogoutModal] = useState(false);

    return (
        <>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <ButtonBase
                    sx={{
                        p: 0.25,
                        bgcolor: open ? iconBackColorOpen : 'transparent',
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'secondary.lighter' }
                    }}
                    aria-label="open profile"
                    ref={anchorRef}
                    aria-controls={open ? 'profile-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
                        <Avatar alt="profile user" src={ProfileLogo} sx={{ width: 32, height: 32 }} />
                        <Typography variant="subtitle1">Admin</Typography>
                    </Stack>
                </ButtonBase>
                <Popper
                    placement="bottom-end"
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 9]
                                }
                            }
                        ]
                    }}
                >
                    {({ TransitionProps }) => (
                        <Transitions type="fade" in={open} {...TransitionProps}>
                            {open && (
                                <Paper
                                    sx={{
                                        boxShadow: theme.customShadows.z1,
                                        width: 290,
                                        minWidth: 240,
                                        maxWidth: 290,
                                        [theme.breakpoints.down('md')]: {
                                            maxWidth: 250
                                        }
                                    }}
                                >
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MainCard elevation={0} border={false} content={false}>
                                            <CardContent sx={{ px: 2.5, pt: 3 }}>
                                                <Grid container justifyContent="space-between" alignItems="center">
                                                    <Grid item>
                                                        <Stack direction="row" spacing={1.25} alignItems="center">
                                                            <Avatar alt="profile user" src={ProfileLogo} sx={{ width: 32, height: 32 }} />
                                                            <Stack>
                                                                <Typography variant="h6">Admin</Typography>
                                                                {/* <Typography variant="body2" color="textSecondary">
                                                                UI/UX Designer
                                                            </Typography> */}
                                                            </Stack>
                                                        </Stack>
                                                    </Grid>
                                                    <Grid item></Grid>
                                                </Grid>
                                            </CardContent>
                                            {open && (
                                                <>
                                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="profile-setting">
                                                        <Tabs
                                                            variant="fullWidth"
                                                            value={value}
                                                            onChange={handleChange}
                                                            aria-label="profile tabs"
                                                            className="d-none"
                                                        >
                                                            <Tab
                                                                sx={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    textTransform: 'capitalize'
                                                                }}
                                                                icon={<SettingOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                                                                label="Setting"
                                                                {...a11yProps(0)}
                                                            />
                                                        </Tabs>
                                                    </Box>
                                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                                        <ProfileTab handleLogout={() => setlogoutModal(true)} />
                                                    </TabPanel>
                                                </>
                                            )}
                                        </MainCard>
                                    </ClickAwayListener>
                                </Paper>
                            )}
                        </Transitions>
                    )}
                </Popper>
            </Box>
            <Modal title="" centered open={logoutModal} onCancel={() => setlogoutModal(false)} footer={''} width="500px">
                <div className="mt-4 text-center">
                    <div
                        className="profile-img-table m-auto d-flex justify-content-center align-items-center bg-light-red text-danger h5 mb-3"
                        style={{ height: '70px', width: '70px', fontSize: '30px' }}
                    >
                        <LogoutOutlined />
                    </div>
                    <h4 className="mb-4">Are you sure want to Logout?</h4>
                    <Button size="large" className="me-2" onClick={() => setlogoutModal(false)}>
                        No
                    </Button>
                    <Button type="primary" size="large" danger onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default Profile;
