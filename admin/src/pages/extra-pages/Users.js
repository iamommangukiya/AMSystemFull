import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination } from '@mui/material';
import { Divider, Popconfirm, message, Tooltip, Empty, Alert } from 'antd';
import { StopOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, CheckCircleFilled, StopFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DomainContext, PadinationContext } from 'App';
import { useDispatch } from 'react-redux';
import { activeItem } from 'store/reducers/menu';
import noimage from 'assets/images/image.jpg';
import { BASE_URL, BASE_URL1 } from 'Configration';

const Users = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const baseUrl = useContext(DomainContext);
    const [breadcrumb, setBreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const paginationcontext = useContext(PadinationContext);
    const localusers = JSON.parse(localStorage.getItem('ad_users'));
    const [searchTerm, setSearchTerm] = useState('');
    const [userdata, setUserData] = useState([]);
    const [pageUserData, setPageUserData] = useState([]);
    const [changestate, setchangestate] = useState(true);
    const [popup, setPopup] = useState({ show: false, message: '', success: true });
    useEffect(() => {}, []);
    useEffect(() => {
        if (token?.is_login && token?.is_login === true) {
            dispatch(activeItem({ openItem: ['util-user'] }));
            const userList = new FormData();
            userList.append('user_type', 'user');
            try {
                axios
                    .get(`${BASE_URL1}/featchUsers`, {})
                    .then((response) => {
                        return response.data;
                    })
                    .then((data) => {
                        if (data.data) {
                            setUserData(data.data);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate('/login');
        }
    }, [changestate]);

    useEffect(() => {
        if (popup.show) {
            setTimeout(() => {
                setPopup(false);
            }, 3000);
        }
    }, [popup]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filteredData = userdata.filter((user) => {
            const searchTerm = value.toLowerCase();
            return (
                user.firstName.toLowerCase().includes(searchTerm) ||
                user.lastName.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        });
        setPageUserData(filteredData);
    };

    const breadcrumbManager = (a, b) => {
        let bread = [];
        let prepath = false;
        for (var i = 0; i < breadcrumb?.length; i++) {
            bread.push(breadcrumb[i]);
            if (breadcrumb[i].url === b) {
                prepath = true;
                break;
            }
        }
        if (prepath === false) {
            bread.push({ name: a, url: b });
        }

        sessionStorage.setItem('breadcrumb', JSON.stringify(bread));
    };

    // Function to delete user
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
                    setchangestate(!changestate);
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

    // Function to block or unblock user
    const blockUser = (userId) => {
        const blockuserdata = new FormData();
        blockuserdata.append('user_id', userId);
        try {
            axios
                .post(`${BASE_URL}/user_details/block_unblock_user`, blockuserdata, {
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    }
                })
                .then((response) => response.data)
                .then((data) => {
                    setPopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        const updatedData = userdata.map((user) => {
                            if (user._id === userId) {
                                return { ...user, is_active: !user.is_active };
                            } else {
                                return user;
                            }
                        });
                        setUserData(updatedData);
                        localStorage.setItem('ad_users', JSON.stringify(updatedData));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleshowClick = (data) => {
        navigate(`/profile`, { state: { users: data } });
    };

    const [page, setPage] = useState(paginationcontext.pagination.users);
    const [totalPage, setTotalPage] = useState(1);

    const pageChange = (event, pages) => {
        setPage(pages);
        paginationcontext.setpagination({ ...paginationcontext.pagination, users: pages });
    };

    useEffect(() => {
        let value = [];
        for (var i = (page - 1) * 10; i < page * 10; i++) {
            userdata[i] != undefined && value.push(userdata[i]);
        }
        if (value?.length < 1 && page > 1) {
            setPage(page - 1);
        }
        setTotalPage(Math.ceil(userdata?.length / 10));
        setPageUserData(value);
    }, [userdata, page]);

    useEffect(() => {
        let bread = [];
        let prepath = false;
        for (var i = 0; i < breadcrumb?.length; i++) {
            bread.push(breadcrumb[i]);
            if (breadcrumb[i].url === window.location.pathname) {
                prepath = true;
                break;
            }
        }
        if (prepath === false) {
            setBreadcrumb(JSON.parse(sessionStorage.getItem('breadcrumb')));
        } else {
            setBreadcrumb(bread);
            sessionStorage.setItem('breadcrumb', JSON.stringify(bread));
        }
    }, []);

    return (
        <>
            <div className="breadcrumb d-flex align-items-center">
                <p style={{ color: '#000000' }}>Users</p>
            </div>
            <div className="col-lg-12 d-flex flex-wrap align-items-center mb-3">
                <div className="col-lg-6 p-2 position-relative">
                    <input
                        className="search-input"
                        placeholder="Search here"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="search-icon">
                        <SearchOutlined />
                    </div>
                </div>
            </div>
            <Divider orientation="left" className="my-2">
                Users
            </Divider>
            <div className="p-2">
                {pageUserData.length > 0 ? (
                    <TableContainer component={Paper} className="mb-4">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-light-gray">
                                    <TableCell className="bh-line text-center">Frist Name</TableCell>
                                    <TableCell className="bh-line text-center">Last Name</TableCell>
                                    <TableCell className="bh-line text-center">E-mail</TableCell>
                                    <TableCell className="bh-line text-center">Mobile No.</TableCell>
                                    <TableCell align="center" style={{ minWidth: '150px' }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageUserData.map((data, i) => (
                                    <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell className="br-line" component="th" scope="row">
                                            <div className="d-flex align-items-center">
                                                <div className="position-absolute d-flex align-items-center">
                                                    <span className="m-3 text-center">{data.firstName}</span>
                                                    {data.is_verified && (
                                                        <div className="verified-user">
                                                            <CheckCircleFilled />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="br-line text-center">{data.lastName}</TableCell>
                                        <TableCell className="br-line text-center">{data.email}</TableCell>
                                        <TableCell className="br-line text-center">
                                            {data.phoneNo ? `+${+91} ${data.phoneNo}` : '-'}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip placement="top" title="View User">
                                                <button
                                                    className="me-2 action-button bg-white"
                                                    style={{ border: '1px solid #1677ff', color: '#1677ff' }}
                                                    onClick={() => handleshowClick(data)}
                                                >
                                                    <EyeOutlined />
                                                </button>
                                            </Tooltip>
                                            {!data.is_active ? (
                                                <>
                                                    <Popconfirm
                                                        title="Are you sure to unblock this user?"
                                                        description="Are you sure to unblock this user?"
                                                        onConfirm={() => {
                                                            blockUser(data._id);
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
                                                </>
                                            ) : (
                                                <>
                                                    <Popconfirm
                                                        title="Are you sure to block this user?"
                                                        description="Are you sure to block this user?"
                                                        onConfirm={() => {
                                                            blockUser(data._id);
                                                        }}
                                                        onCancel={() => {}}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Tooltip placement="top" title={'Block User'}>
                                                            <div
                                                                className="me-2 action-button bg-white"
                                                                style={{ border: '1px solid rgb(255 134 0)', color: 'rgb(255 134 0)' }}
                                                            >
                                                                <StopOutlined />
                                                            </div>
                                                        </Tooltip>
                                                    </Popconfirm>
                                                </>
                                            )}
                                            <Popconfirm
                                                title="Are you sure to delete this user?"
                                                description="Are you sure to delete this user?"
                                                onConfirm={() => deleteUser(data.id)}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Tooltip placement="top" title={'Delete User'}>
                                                    <div
                                                        className="action-button bg-white"
                                                        style={{ border: '1px solid #ff4d4f', color: '#ff4d4f' }}
                                                    >
                                                        <DeleteOutlined />
                                                    </div>
                                                </Tooltip>
                                            </Popconfirm>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Empty />
                )}
            </div>
            {totalPage > 1 && (
                <Pagination
                    count={totalPage}
                    defaultPage={1}
                    color="primary"
                    className="my-5 d-flex justify-content-center"
                    page={page}
                    onChange={pageChange}
                />
            )}
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

export default Users;
