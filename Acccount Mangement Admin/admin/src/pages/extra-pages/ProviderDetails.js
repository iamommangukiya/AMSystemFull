import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Button, Popconfirm, Tooltip, Skeleton, Space, Modal, Tag, Empty, Alert } from 'antd';
import { CheckCircleFilled, EyeOutlined, StopOutlined, DeleteOutlined, StopFilled } from '@ant-design/icons';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useEffect } from 'react';
import { useNavigate, useParams } from '../../../node_modules/react-router/dist/index';
import { Link } from 'react-router-dom';
import { DomainContext } from 'App';
import { UncontrolledCarousel } from 'reactstrap';
import DiamondIcon from '@mui/icons-material/Diamond';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper';
import { BASE_URL } from 'Configration';
import noimage from 'assets/images/image.jpg';
import ImgModal from 'components/ImgModal';

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

const ProviderProfile = () => {
    const [value, setValue] = useState(0);
    const [provalue, setproValue] = useState(0);
    const theme = useTheme();
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const baseUrl = useContext(DomainContext);
    const [breadcrumb, setbreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const navigate = useNavigate();
    const [eventmodal, seteventmodal] = useState(false);
    const [oneeventData, setoneeventData] = useState({});
    const [items, setitems] = useState([]);
    const [popup, setpopup] = useState({ show: false, message: '', success: true });

    useEffect(() => {
        if (popup.show) {
            setTimeout(() => {
                setpopup(false);
            }, 3000);
        }
    }, [popup]);

    const { profile_id } = useParams();

    const [imgModal, setimgModal] = useState(false);
    const [imgUrl, setimgUrl] = useState('');

    useEffect(() => {
        if (token?.is_login && token?.is_login == true) {
            const profileId = new FormData();
            profileId.append('user_id', profile_id);
            Promise.all([
                fetch(`${BASE_URL}/user_details/get_user_detail`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    },
                    body: profileId
                }).then((response) => response.json())
                // fetch(`${BASE_URL}/admin/follower_list`, {
                //     method: 'POST',
                //     headers: {
                //         Authorization: `Bearer ${token.token}`
                //     },
                //     body: profileId
                // }).then((response) => response.json()),
                // fetch(`${BASE_URL}/admin/following_list`, {
                //     method: 'POST',
                //     headers: {
                //         Authorization: `Bearer ${token.token}`
                //     },
                //     body: profileId
                // }).then((response) => response.json()),
                // fetch(`${BASE_URL}/admin/report_user_list`, {
                //     method: 'POST',
                //     headers: {
                //         Authorization: `Bearer ${token.token}`
                //     },
                //     body: profileId
                // }).then((response) => response.json()),
                // fetch(`${BASE_URL}/post_detail/post_list`, {
                //     method: 'POST',
                //     headers: {
                //         Authorization: `Bearer ${token.token}`
                //     },
                //     body: profileId
                // }).then((response) => response.json()),
                // fetch(`${BASE_URL}/admin/buying_order_list`, {
                //     method: 'POST',
                //     headers: {
                //         Authorization: `Bearer ${token.token}`
                //     },
                //     body: profileId
                // }).then((response) => response.json()),
                // fetch(`${BASE_URL}/event_detail/event_list`, {
                //     method: 'POST',
                //     headers: {
                //         Authorization: `Bearer ${token.token}`
                //     },
                //     body: profileId
                // }).then((response) => response.json()),
                // fetch(`${BASE_URL}/payment_history/user_transaction_list`, {
                //     method: 'POST',
                //     headers: {
                //         Authorization: `Bearer ${token.token}`
                //     },
                //     body: profileId
                // }).then((response) => response.json())
            ]).then((values) => {
                if (values[0].success) {
                    setuserdetails(values[0].data);
                }
                // if (values[1].success) {
                //     setfollower(values[1].data);
                // }
                // if (values[2].success) {
                //     setfollowing(values[2].data);
                // }
                // if (values[3].success) {
                //     setreport(values[3].data);
                // }
                // if (values[4].success) {
                //     setsell_products(values[4].data);
                // }
                // if (values[5].success) {
                //     setbuy_products(values[5].data);
                // }
                // if (values[6].success) {
                //     setevents(values[6].data);
                // }
                // if (values[7].success) {
                //     settransaction(values[7].data);
                // }
                setload(false);
            });
        } else {
            navigate('/login');
        }
    }, [profile_id, value, provalue]);

    const [load, setload] = useState(true);
    const [walletModal, setwalletModal] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const productChange = (event, newValue) => {
        setproValue(newValue);
    };

    const breadcrumbManager = (a, b) => {
        let bread = [];
        let prepath = false;
        for (var i = 0; i < breadcrumb?.length; i++) {
            bread.push(breadcrumb[i]);
            if (breadcrumb[i].url == b) {
                prepath = true;
                break;
            }
        }
        if (prepath == false) {
            bread.push({ name: a, url: b });
        }

        sessionStorage.setItem('breadcrumb', JSON.stringify(bread));
    };

    const [userdetails, setuserdetails] = useState({});
    const [follower, setfollower] = useState([]);
    const [following, setfollowing] = useState([]);
    const [report, setreport] = useState([]);
    const [sell_products, setsell_products] = useState([]);
    const [buy_products, setbuy_products] = useState([]);
    const [events, setevents] = useState([]);
    const [transaction, settransaction] = useState([]);

    useEffect(() => {
        let bread = [];
        let prepath = false;
        for (var i = 0; i < breadcrumb?.length; i++) {
            bread.push(breadcrumb[i]);
            if (breadcrumb[i].url == window.location.pathname) {
                prepath = true;
                break;
            }
        }
        if (prepath == false) {
            setbreadcrumb(JSON.parse(sessionStorage.getItem('breadcrumb')));
        } else {
            setbreadcrumb(bread);
            sessionStorage.setItem('breadcrumb', JSON.stringify(bread));
        }
    }, [userdetails]);

    // ================== Delete User ==================

    const deleteUser = (a) => {
        const deleteuser = new FormData();
        deleteuser.append('user_id', a);
        try {
            fetch(`${BASE_URL}/user_details/delete_user`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: deleteuser
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        navigate('/users');
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    // ======================= Block User and Unblock User ============================

    const blockUser = (a) => {
        const blockuserdata = new FormData();
        blockuserdata.append('user_id', a);
        try {
            fetch(`${BASE_URL}/user_details/block_unblock_user`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: blockuserdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        setuserdetails({ ...userdetails, is_active: !userdetails.is_active });
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    // ======================= Verify User and Unverify User ============================

    const verifyUser = (a) => {
        const verifyuserdata = new FormData();
        verifyuserdata.append('user_id', a);
        try {
            fetch(`${BASE_URL}/user_details/verified_unverified_user`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: verifyuserdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        setuserdetails({ ...userdetails, is_verified: !userdetails.is_verified });
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const ambassadorUser = (a) => {
        const verifyuserdata = new FormData();
        verifyuserdata.append('user_id', a);
        try {
            fetch(`${BASE_URL}/user_details/made_ambassador_user`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: verifyuserdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        setuserdetails({ ...userdetails, is_ambassador: userdetails.is_ambassador ? !userdetails.is_ambassador : true });
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="breadcrumb d-flex align-items-center">
                {breadcrumb?.map((e, i) => {
                    return (
                        <>
                            {i != breadcrumb?.length - 1 ? (
                                <>
                                    <Link
                                        key={e.url}
                                        to={e.url}
                                        onClick={() => {
                                            breadcrumbManager(e.name, e.url);
                                            setload(true);
                                        }}
                                    >
                                        <p style={{ color: '#abaaaa' }}>{e.name}</p>
                                    </Link>
                                    <p className="mx-2">/</p>
                                </>
                            ) : (
                                <Link key={e.url} to={e.url} onClick={() => breadcrumbManager(e.name, e.url)}>
                                    <p style={{ color: '#000000' }}>{e.name}</p>
                                </Link>
                            )}
                        </>
                    );
                })}
            </div>
            {load ? (
                <></>
            ) : (
                <>
                    <div className="w-100 d-flex flex-wrap" style={{ height: '430px' }}>
                        <div className="col-lg-6 profilemodal p-2" style={{ height: '100%' }}>
                            <div className="w-100 rounded-2 bg-white p-3 position-relative" style={{ height: '100%' }}>
                                <div className="text-center">
                                    <div className="position-relative my-3 d-inline-block">
                                        <div className="profile-img-table m-auto" style={{ width: '100px', height: '100px' }}>
                                            <img
                                                src={`${userdetails?.profile_picture}`}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = noimage;
                                                }}
                                                alt="profile"
                                                className="object-fit"
                                            />
                                        </div>
                                        {userdetails?.is_verified && (
                                            <>
                                                <div className="verified-user" style={{ right: '0', fontSize: '24px' }}>
                                                    <CheckCircleFilled />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <h5>
                                        {userdetails?.name}{' '}
                                        {userdetails.is_ambassador && (
                                            <span style={{ color: '#faad25' }}>
                                                <DiamondIcon className="me-1" />
                                                Ambassador
                                            </span>
                                        )}
                                    </h5>
                                    <p className="mb-0">{`Email : ${userdetails?.email_address}`}</p>
                                    {userdetails?.dob && (
                                        <p className="mb-0">{`Birth Date : ${new Date(userdetails?.dob).toDateString()}`}</p>
                                    )}
                                    {userdetails?.mobile_number && (
                                        <p className="mb-0">{`Mobile No. : +${userdetails?.country_code}  ${userdetails?.mobile_number}`}</p>
                                    )}

                                    <div className="d-flex flex-wrap mx-auto justify-content-center mt-4">
                                        {userdetails.is_verified ? (
                                            <Popconfirm
                                                title="Are you sure to unverify this user?"
                                                description="Are you sure to unverify this user?"
                                                onConfirm={() => {
                                                    verifyUser(userdetails._id);
                                                }}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button className="btn btn-outline-secondary mb-5 btn-sm me-2 d-flex justify-content-center align-items-center">
                                                    <CheckCircleFilled className="me-1" /> Unverify
                                                </button>
                                            </Popconfirm>
                                        ) : (
                                            <Popconfirm
                                                title="Are you sure to verify this user?"
                                                description="Are you sure to verify this user?"
                                                onConfirm={() => {
                                                    verifyUser(userdetails._id);
                                                }}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button className="btn btn-outline-success mb-5 btn-sm me-2 d-flex justify-content-center align-items-center">
                                                    <CheckCircleFilled className="me-1" /> Verify
                                                </button>
                                            </Popconfirm>
                                        )}
                                        {!userdetails.is_active ? (
                                            <Popconfirm
                                                title="Are you sure to unblock this user?"
                                                description="Are you sure to unblock this user?"
                                                onConfirm={() => {
                                                    blockUser(userdetails._id);
                                                }}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Tooltip placement="top" title={'Unblock User'}>
                                                    <div
                                                        className="me-2 action-button bg-white"
                                                        style={{ border: '1px solid #4caf50', color: '#4caf50' }}
                                                    >
                                                        <StopFilled />
                                                    </div>
                                                </Tooltip>
                                            </Popconfirm>
                                        ) : (
                                            <Popconfirm
                                                title="Are you sure to block this user?"
                                                description="Are you sure to block this user?"
                                                onConfirm={() => {
                                                    blockUser(userdetails._id);
                                                }}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Tooltip placement="top" title={'Block User'}>
                                                    <div
                                                        className="me-2 action-button bg-white d-flex justify-content-center align-items-center"
                                                        style={{ border: '1px solid rgb(255 134 0)', color: 'rgb(255 134 0)' }}
                                                    >
                                                        <StopOutlined />
                                                    </div>
                                                </Tooltip>
                                            </Popconfirm>
                                        )}
                                        <Popconfirm
                                            title="Are you sure to delete this user?"
                                            description="Are you sure to delete this user?"
                                            onConfirm={() => deleteUser(userdetails._id)}
                                            onCancel={() => {}}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Tooltip placement="top" title={'Delete User'}>
                                                <div
                                                    className="action-button bg-white d-flex justify-content-center align-items-center me-2"
                                                    style={{ border: '1px solid #ff4d4f', color: '#ff4d4f' }}
                                                >
                                                    <DeleteOutlined />
                                                </div>
                                            </Tooltip>
                                        </Popconfirm>
                                        {userdetails.is_ambassador ? (
                                            <Popconfirm
                                                title="Are you sure to Remove Ambassador?"
                                                description="Are you sure to Remove Ambassador?"
                                                onConfirm={() => {
                                                    ambassadorUser(userdetails._id);
                                                }}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button
                                                    className="btn btn-outline-secondary mb-5 btn-sm d-flex justify-content-center align-items-center"
                                                    style={{ fontSize: '14px' }}
                                                >
                                                    <DiamondIcon className="me-1" style={{ height: '21px' }} /> Remove Ambassador
                                                </button>
                                            </Popconfirm>
                                        ) : (
                                            <Popconfirm
                                                title="Are you sure to Make Ambassador?"
                                                description="Are you sure to Make Ambassador?"
                                                onConfirm={() => {
                                                    ambassadorUser(userdetails._id);
                                                }}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button
                                                    className="btn btn-outline-success ambassador mb-5 btn-sm d-flex justify-content-center align-items-center"
                                                    style={{ fontSize: '14px' }}
                                                >
                                                    <DiamondIcon className="me-1" style={{ height: '21px' }} /> Make Ambassador
                                                </button>
                                            </Popconfirm>
                                        )}
                                    </div>
                                </div>
                                {/* <div className="w-100 d-flex flex-wrap justify-content-between">
                                    <div className="col-lg-2 text-center">
                                        <h3>{userdetails?.follower}</h3>
                                        <p>Followers</p>
                                    </div>
                                    <div className="col-lg-2 text-center">
                                        <h3>{userdetails?.following}</h3>
                                        <p>Followings</p>
                                    </div>
                                    <div className="col-lg-2 text-center">
                                        <h3>{userdetails?.selling_product}</h3>
                                        <p>Sell Products</p>
                                    </div>
                                    <div className="col-lg-2 text-center">
                                        <h3>{userdetails?.buying_product}</h3>
                                        <p>Buy Products</p>
                                    </div>
                                    <div className="col-lg-2 text-center">
                                        <h3>{userdetails?.event}</h3>
                                        <p>Events</p>
                                    </div>
                                </div> */}
                                {/* <div
                                    className="category-box btn btn-outline-success position-absolute btn-sm d-flex align-items-center"
                                    style={{
                                        top: '20px',
                                        right: '20px',
                                        fontWeight: '600',
                                        border: '1px solid #198754',
                                        lineHeight: '20px'
                                    }}
                                    role="presentation"
                                    onClick={() => setwalletModal(true)}
                                >
                                    <AccountBalanceWalletOutlinedIcon className="me-1" style={{ fontSize: '20px' }} />{' '}
                                    {`$${userdetails?.wallet ? userdetails?.wallet?.toFixed(2) : '0'}`}
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-6 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100 p-3" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    {userdetails?.provider_introduction && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Introduction</p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {userdetails?.provider_introduction}
                                            </span>
                                        </div>
                                    )}
                                    {userdetails?.provider_services?.length > 0 && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Describe Services </p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {userdetails?.provider_services?.map((data) => {
                                                    return `${data.description_name}, `;
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    {userdetails?.website_link?.length > 0 && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Website Link</p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {userdetails?.website_link?.join(', ')}
                                            </span>
                                        </div>
                                    )}
                                    {userdetails?.provider_banner_images?.length > 0 && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Provider Banner Image</p>
                                            <div className="col-lg-8 d-flex flex-wrap">
                                                {userdetails?.provider_banner_images?.map((data) => {
                                                    return (
                                                        <>
                                                            <div
                                                                class="polygon-imgae me-3 mb-3"
                                                                role="presentation"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => {
                                                                    setimgModal(true);
                                                                    setimgUrl(data?.file_name);
                                                                }}
                                                            >
                                                                <div class="p_image_shape">
                                                                    <img src={data?.file_name} alt="img" />
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Provider Details</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-100">
                        <div className="col-lg-12 p-2">
                            <div className="w-100 rounded-2 bg-white p-3">
                                <Tabs
                                    variant="fullWidth"
                                    value={provalue}
                                    onChange={productChange}
                                    aria-label="profile tabs"
                                    style={{ borderBottom: '1px solid #d4d4d4' }}
                                >
                                    <Tab
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textTransform: 'capitalize'
                                        }}
                                        label="Sell Products"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textTransform: 'capitalize'
                                        }}
                                        label="Buy Products"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textTransform: 'capitalize'
                                        }}
                                        label="Events"
                                        {...a11yProps(0)}
                                    />
                                </Tabs>
                                <TabPanel value={provalue} index={0} dir={theme.direction} className="pt-3">
                                    <div className="w-100 d-flex flex-wrap">
                                        {sell_products?.map((data) => {
                                            return (
                                                <>
                                                    <div className="col-lg-2 p-2" key={data._id}>
                                                        <Link
                                                            to={`/productdetails/${data._id}`}
                                                            onClick={() => breadcrumbManager(data.name, `/productdetails/${data._id}`)}
                                                        >
                                                            <div className="card">
                                                                <img
                                                                    src={`${baseUrl.imageBase}/uploads/${data.image}`}
                                                                    className="card-img-top object-fit"
                                                                    alt="..."
                                                                    style={{ height: '200px' }}
                                                                />
                                                                <div className="card-body">
                                                                    <p className="mb-0" style={{ color: 'rgb(176 176 176)' }}>
                                                                        {data?.category_id?.category_name}
                                                                    </p>
                                                                    <h6 className="card-title mb-3 text-dark">
                                                                        {data.name}
                                                                        {data.is_sold && (
                                                                            <Tag color="volcano" className="ms-1">
                                                                                Sold
                                                                            </Tag>
                                                                        )}
                                                                    </h6>
                                                                    <h5 className="card-price">{`$${data.price}`}</h5>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </>
                                            );
                                        })}
                                        <div className="m-auto mt-3">{sell_products?.length < 1 && <Empty />}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={provalue} index={1} dir={theme.direction} className="pt-3">
                                    <div className="w-100 d-flex flex-wrap">
                                        {buy_products?.map((data) => {
                                            return (
                                                <>
                                                    <div className="col-lg-2 p-2" key={data._id}>
                                                        <Link
                                                            to={`/productdetails/${data._id}`}
                                                            onClick={() => breadcrumbManager(data.name, `/productdetails/${data._id}`)}
                                                        >
                                                            <div className="card">
                                                                <img
                                                                    src={`${baseUrl.imageBase}/uploads/${data.image_file}`}
                                                                    className="card-img-top object-fit"
                                                                    alt="..."
                                                                    style={{ height: '200px' }}
                                                                />
                                                                <div className="card-body">
                                                                    <p className="mb-0" style={{ color: 'rgb(176 176 176)' }}>
                                                                        {data?.category_id?.category_name}
                                                                    </p>
                                                                    <h6 className="card-title mb-3 text-dark">
                                                                        {data.title ? data.title : data.pet_name}
                                                                    </h6>
                                                                    <h5 className="card-price">{`$${data.price}`}</h5>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </>
                                            );
                                        })}
                                        <div className="m-auto mt-3">{buy_products?.length < 1 && <Empty />}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={provalue} index={2} dir={theme.direction} className="pt-3">
                                    <div className="w-100 d-flex flex-wrap">
                                        {events?.map((data) => {
                                            var date = new Date(data?.event_date_time).toLocaleDateString();
                                            var time = new Date(data?.event_date_time).toLocaleTimeString();
                                            const [hour, minute, second] = time.split(':');
                                            var finaltime;
                                            if (time.includes('AM') || time.includes('PM')) {
                                                finaltime = time;
                                            } else {
                                                finaltime =
                                                    hour >= 12 ? `${hour == 12 ? 12 : hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
                                            }
                                            return (
                                                <>
                                                    <div
                                                        key={data._id}
                                                        className="col-lg-2 p-2"
                                                        onClick={() => {
                                                            setoneeventData({
                                                                data: data,
                                                                date: `${date}`,
                                                                time: finaltime
                                                            });
                                                            seteventmodal(true);
                                                            let imageArray = [];
                                                            data?.image?.map((image) => {
                                                                imageArray.push({
                                                                    src: `${baseUrl.imageBase}/uploads/${image?.image_file}`,
                                                                    file_type: image.file_type
                                                                });
                                                            });
                                                            setitems(imageArray);
                                                        }}
                                                        role="presentation"
                                                    >
                                                        <div className="card">
                                                            <img
                                                                src={
                                                                    data.image[0]?.file_type == 'image'
                                                                        ? `${baseUrl.imageBase}/uploads/${data.image[0]?.image_file}`
                                                                        : `${baseUrl.imageBase}/uploads/${data.image[1]?.image_file}`
                                                                }
                                                                className="card-img-top"
                                                                alt="..."
                                                                style={{ height: '200px' }}
                                                            />
                                                            <div className="card-body">
                                                                <p className="mb-0" style={{ color: 'rgb(176 176 176)' }}>
                                                                    {`${date} at ${finaltime}`}
                                                                </p>
                                                                <h6 className="card-title mb-0">{data.event_title}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                        <div className="m-auto mt-3">{events?.length < 1 && <Empty />}</div>
                                    </div>
                                </TabPanel>
                            </div>
                        </div>
                    </div> */}
                </>
            )}
            <Modal
                title="User Balance & Transaction"
                centered
                open={walletModal}
                onCancel={() => setwalletModal(false)}
                footer={''}
                width="500px"
                className="wallet-modal"
            >
                <div className="w-100 rounded-2 bg-white position-relative followlist" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-100" style={{ height: '400px', marginTop: '46px', overflow: 'scroll' }}>
                        <h6 style={{ color: 'rgb(168 168 168)' }} className="mb-0 p-2">
                            Transaction history
                        </h6>
                        <ul className="m-0 p-0">
                            {transaction.map((data) => {
                                var date = new Date(data?.created_at).toLocaleDateString();
                                var time = new Date(data?.created_at).toLocaleTimeString();
                                const [hour, minute, second] = time.split(':');
                                var finaltime;
                                if (time.includes('AM') || time.includes('PM')) {
                                    finaltime = time;
                                } else {
                                    finaltime = hour >= 12 ? `${hour == 12 ? 12 : hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
                                }
                                return (
                                    <>
                                        {data.transaction_type == 'credited' ? (
                                            <>
                                                <li
                                                    className="p-2 d-flex justify-content-between align-items-center"
                                                    style={{ borderBottom: '1px solid #f1f1f1' }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="profile-img-table me-3 d-flex justify-content-center align-items-center bg-light-green text-success h5 mb-0"
                                                            style={{ transform: 'rotate(125deg)' }}
                                                        >
                                                            <NorthOutlinedIcon />
                                                        </div>
                                                        <div>
                                                            <h6 className="m-0">
                                                                {data.transaction_for == 'transfer'
                                                                    ? `Credited from ${data.from_user_id?.user_name}`
                                                                    : 'Add to Wallet'}
                                                            </h6>
                                                            <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                                {`${date} at ${finaltime}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <h5 className="m-0 h6 text-success">+ ${data.transfer_amount}</h5>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li
                                                    className="p-2 d-flex justify-content-between align-items-center"
                                                    style={{ borderBottom: '1px solid #f1f1f1' }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="profile-img-table me-3 d-flex justify-content-center align-items-center bg-light-red text-danger h5 mb-0"
                                                            style={{ transform: 'rotate(-45deg)' }}
                                                        >
                                                            <NorthOutlinedIcon />
                                                        </div>
                                                        <div>
                                                            <h6 className="m-0">
                                                                {data.transaction_for == 'transfer'
                                                                    ? `Debited to ${data.to_user_id?.user_name}`
                                                                    : 'Withdraw to Wallet'}
                                                            </h6>
                                                            <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                                {`${date} at ${finaltime}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <h5 className="m-0 h6 text-danger">- ${data.transfer_amount}</h5>
                                                </li>
                                            </>
                                        )}
                                    </>
                                );
                            })}
                        </ul>
                        {transaction.length < 1 && <div className="m-auto mt-3">{transaction?.length < 1 && <Empty />}</div>}
                    </div>
                    <div
                        className="p-2 px-0 position-absolute w-100"
                        style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                    >
                        <h5 className="m-0 d-flex justify-content-between">
                            Currunt Balance{' '}
                            <span style={{ fontWeight: '700', fontSize: '24px' }} className="text-success">
                                ${userdetails?.wallet?.toFixed(2)}
                            </span>
                        </h5>
                    </div>
                </div>
            </Modal>

            <Modal title="Event Details" centered open={eventmodal} onCancel={() => seteventmodal(false)} footer={''} width="600px">
                <div className="w-100 ">
                    <div className="w-100 mt-2 rounded-2 bg-white" style={{ height: '300px', overflow: 'hidden' }}>
                        {/* <UncontrolledCarousel interval={2000} items={items} style={{ height: '100%' }} /> */}
                        <Swiper
                            modules={[Navigation, A11y, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            onSwiper={(swiper) => {}}
                            onSlideChange={() => {}}
                            style={{ height: '100%' }}
                            autoplay={{ delay: 5000 }}
                            className="w-100"
                        >
                            {items?.map((src) => {
                                return (
                                    <SwiperSlide style={{ height: '100%' }}>
                                        {src.file_type == 'image' ? (
                                            <img src={src.src} className="object-fit" alt="product-img" />
                                        ) : (
                                            <video className="object-fit" controls>
                                                <source src={src.src} type="video/mp4"></source>
                                                <track src="captions_en.vtt" kind="captions" srclang="en" label="english_captions"></track>
                                            </video>
                                        )}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <div className="w-100 p-3">
                        <h6 className=" m-0 mb-1 ">Created By</h6>
                        <div className="p-2 px-0 d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center">
                                <div className="position-relative">
                                    <div className="profile-img-table me-3">
                                        <img
                                            src={`${baseUrl.imageBase}/uploads/${oneeventData?.data?.user_id?.profile_picture}`}
                                            alt="profile"
                                            width="100%"
                                            className="object-fit"
                                        />
                                    </div>
                                    {oneeventData?.data?.user_id?.is_verified && (
                                        <>
                                            <div className="verified-user">
                                                <CheckCircleFilled />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <h6 className="m-0">{oneeventData?.data?.user_id?.user_name}</h6>
                                </div>
                            </div>
                        </div>
                        <h6 className=" m-0 mb-3">Details</h6>
                        {oneeventData?.data?.event_title && (
                            <div className="p-0 mb-1 px-0 d-flex ">
                                <p className="m-0 col-lg-4">Event Name </p>
                                <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                    {oneeventData?.data?.event_title}
                                </span>
                            </div>
                        )}

                        {oneeventData?.date && (
                            <div className="p-0 mb-1 px-0 d-flex ">
                                <p className="m-0 col-lg-4">Date</p>
                                <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                    {oneeventData?.date}
                                </span>
                            </div>
                        )}
                        {oneeventData?.time && (
                            <div className="p-0 mb-1 px-0 d-flex ">
                                <p className="m-0 col-lg-4">Time</p>
                                <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                    {oneeventData?.time}
                                </span>
                            </div>
                        )}
                        {oneeventData?.data?.address && (
                            <div className="p-0 mb-1 px-0 d-flex ">
                                <p className="m-0 col-lg-4">Address</p>
                                <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                    {oneeventData?.data?.address}
                                </span>
                            </div>
                        )}
                        {oneeventData?.data?.description && (
                            <div className="p-0 mb-1 px-0 d-flex ">
                                <p className="m-0 col-lg-4">Descrition</p>
                                <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                    {oneeventData?.data?.description}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            <ImgModal show={imgModal} setShow={setimgModal} imgUrl={imgUrl} />

            {popup.show && (
                <Alert
                    message={popup?.message}
                    type={popup?.success ? 'success' : 'error'}
                    showIcon
                    style={{ position: 'fixed', right: '15px', bottom: '30px' }}
                />
            )}
        </>
    );
};

export default ProviderProfile;
