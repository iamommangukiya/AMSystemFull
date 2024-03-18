import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Button, Popconfirm, Tooltip, Skeleton, Space, Modal, Tag, Empty, Alert } from 'antd';
import { CheckCircleFilled, EyeOutlined, StopOutlined, DeleteOutlined, StopFilled } from '@ant-design/icons';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { DomainContext } from 'App';
import { UncontrolledCarousel } from 'reactstrap';
import DiamondIcon from '@mui/icons-material/Diamond';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper';
import { BASE_URL, BASE_URL1 } from 'Configration';
import noimage from 'assets/images/image.jpg';
import axios from 'axios'; // Import axios library

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

const Profile = () => {
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
    const [userdetails, setuserdetails] = useState({});
    const [transaction, settransaction] = useState([]);
    const [companydata, setcompanydata] = useState([]);
    const [popup, setpopup] = useState({
        show: false,
        message: '',
        success: true
    });

    const location = useLocation();
    const userdata = location.state.users;
    useEffect(() => {
        setuserdetails(userdata);
    }, [userdata]);

    useEffect(() => {
        axios
            .post(`${BASE_URL1}/cmpByid`, {
                id: userdata.id
            })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                if (data.data) {
                    console.log(data.data);
                    setcompanydata(data.data);
                }
            });
    }, [userdetails]);
    const [load, setload] = useState(true);
    const [walletModal, setwalletModal] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const productChange = (event, newValue) => {
        setproValue(newValue);
    };

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

        // ================== Delete User ==================
    }, [userdetails]);

    const deleteUser = (a) => {
        try {
            axios
                .delete(`${BASE_URL1}/deleteUser`, {
                    data: { id: a }, // Pass data object with the id
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                .then((response) => {
                    console.log(response);
                    return response.data;
                })
                .then((data) => {
                    setpopup({
                        show: true,
                        message: data.message,
                        success: data.success
                    });
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
            axios
                .post(`${BASE_URL}/user_details/block_unblock_user`, blockuserdata, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                .then((response) => response.data)
                .then((data) => {
                    setpopup({
                        show: true,
                        message: data.message,
                        success: data.success
                    });
                    if (data.success) {
                        setuserdetails({
                            ...userdetails,
                            is_active: !userdetails.is_active
                        });
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    // ======================= Verify User and Unverify User ============================

    const verifyUser = (a) => {
        try {
            let newStatus = userdetails.status === 'INACTIVE' ? 'active' : 'INACTIVE'; // Toggle status

            axios
                .put(`${BASE_URL1}/user`, { ...a, status: newStatus })
                .then((response) => response.data)
                .then((data) => {
                    setpopup({
                        show: true,
                        message: data.message,
                        success: data.success
                    });
                    if (data.success) {
                        setuserdetails({
                            ...userdetails,
                            is_verified: !userdetails.is_verified,
                            is_active: !userdetails.is_active // Toggle status
                        });
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {/* <div className="breadcrumb d-flex align-items-center">
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
            </div> */}
            {false ? (
                <></>
            ) : (
                <>
                    <div className="w-100 d-flex flex-wrap" style={{ height: '25    0px' }}>
                        <div className="col-lg-6 profilemodal p-2" style={{ height: '100%' }}>
                            <div className="w-100 rounded-2 bg-white p-3 position-relative" style={{ height: '100%' }}>
                                <div className="text-center">
                                    <div className="position-relative my-3 d-inline-block">
                                        {/* <div className="profile-img-table m-auto" style={{ width: '100px', height: '100px' }}>
                                            <img
                                                src={`${userdetails?.profile_picture}`}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = noimage;
                                                }}
                                                alt="profile"
                                                className="object-fit"
                                            />
                                        </div> */}
                                        {userdetails?.status === 'active' && (
                                            <>
                                                <div className="verified-user" style={{ right: '0', fontSize: '24px' }}>
                                                    <CheckCircleFilled />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <h5>
                                        {userdetails?.firstName} {userdetails?.lastName}{' '}
                                    </h5>
                                    <p className="mb-0">{`Email : ${userdetails.email}`}</p>
                                    {/* {userdetails?.dob && (
                                        <p className="mb-0">{`Birth Date : ${new Date(userdetails?.dob).toDateString()}`}</p>
                                    )} */}
                                    {userdetails?.phoneNo && <p className="mb-0">{`Mobile No. : +${+91}  ${userdetails?.phoneNo}`}</p>}

                                    <div className="d-flex flex-wrap mx-auto justify-content-center mt-4">
                                        {userdetails?.status === 'active' ? (
                                            <Popconfirm
                                                title="Are you sure to unverify this user?"
                                                description="Are you sure to unverify this user?"
                                                onConfirm={() => {
                                                    verifyUser(userdetails);
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
                                                    verifyUser(userdetails);
                                                }}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <button className="btn btn-outline-success mb-5 btn-sm me-2 d-flex justify-content-center align-items-center">
                                                    <CheckCircleFilled className="me-1" /> Activate
                                                </button>
                                            </Popconfirm>
                                        )}

                                        <Popconfirm
                                            title="Are you sure to delete this user?"
                                            description="Are you sure to delete this user?"
                                            onConfirm={() => deleteUser(userdetails.id)}
                                            onCancel={() => {}}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Tooltip placement="top" title={'Delete User'}>
                                                <div
                                                    className="action-button bg-white d-flex justify-content-center align-items-center me-2"
                                                    style={{
                                                        border: '1px solid #ff4d4f',
                                                        color: '#ff4d4f'
                                                    }}
                                                >
                                                    <DeleteOutlined />
                                                </div>
                                            </Tooltip>
                                        </Popconfirm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                                            <p
                                                                className="m-0"
                                                                style={{
                                                                    fontSize: '12px',
                                                                    color: 'rgb(168 168 168)'
                                                                }}
                                                            >
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
                                                            <p
                                                                className="m-0"
                                                                style={{
                                                                    fontSize: '12px',
                                                                    color: 'rgb(168 168 168)'
                                                                }}
                                                            >
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
                        style={{
                            borderBottom: '1px solid #0dbcec',
                            color: '#0dbcec',
                            top: '0px'
                        }}
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

export default Profile;
