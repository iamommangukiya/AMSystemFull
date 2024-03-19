import React, { useContext, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Pagination } from '../../../node_modules/@mui/material/index';

import { Divider, Popconfirm, message, Tooltip, Empty, Alert } from 'antd';
import { StopOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, CheckCircleFilled, StopFilled } from '@ant-design/icons';
import { useNavigate } from '../../../node_modules/react-router/dist/index';
import { Link } from 'react-router-dom';
import { DomainContext, PadinationContext } from 'App';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';
import { activeItem } from 'store/reducers/menu';
import noimage from 'assets/images/image.jpg';
import { BASE_URL } from 'Configration';

let keyword = '';

const Users = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const baseUrl = useContext(DomainContext);
    const [breadcrumb, setbreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const paginationcontext = useContext(PadinationContext);

    useEffect(() => {
        if (token?.is_login && token?.is_login == true) {
            dispatch(activeItem({ openItem: ['util-user'] }));
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
                        if (data.success) {
                            localStorage.setItem('ad_users', JSON.stringify(data.data));
                            setuserdata(data.data);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate('/login');
        }
    }, []);

    const localusers = JSON.parse(localStorage.getItem('ad_users'));

    const [userdata, setuserdata] = useState(localusers ? localusers : []);
    const [pageuserdata, setpageuserdata] = useState([]);
    const [searchchange, setsearchchange] = useState('');
    const [popup, setpopup] = useState({ show: false, message: '', success: true });

    useEffect(() => {
        if (popup.show) {
            setTimeout(() => {
                setpopup(false);
            }, 3000);
        }
    }, [popup]);

    const searchevent = (e, f) => {
        keyword = e;
        const newdata = f?.filter((pre) => {
            let re = new RegExp(e, 'gi');
            return pre.name.match(re) || pre.email_address.match(re);
        });
        setuserdata(newdata);
        setpage(1);
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
                        const val = userdata.filter((e) => {
                            return e._id != a;
                        });
                        setuserdata(val);
                        localStorage.setItem('ad_users', JSON.stringify(val));
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
                        const val = userdata?.map((e) => {
                            if (e._id == a) {
                                return { ...e, is_active: !e.is_active };
                            } else {
                                return e;
                            }
                        });
                        setuserdata(val);
                        localStorage.setItem('ad_users', JSON.stringify(val));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const [page, setpage] = useState(paginationcontext.pagination.users);
    const [totalPage, settotalPage] = useState(1);

    const pageChange = (event, pages) => {
        setpage(pages);
        paginationcontext.setpagination({ ...paginationcontext.pagination, users: pages });
    };

    useEffect(() => {
        let value = [];
        for (var i = (page - 1) * 10; i < page * 10; i++) {
            userdata[i] != undefined && value.push(userdata[i]);
        }
        if (value?.length < 1 && page > 1) {
            setpage(page - 1);
        }
        settotalPage(Math.ceil(userdata?.length / 10));
        setpageuserdata(value);
    }, [userdata, page]);

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
    }, []);

    return (
        <>
            <div className="breadcrumb d-flex align-items-center">
                <p style={{ color: '#000000' }}>{'Users'}</p>
            </div>
            <div className="col-lg-12 d-flex flex-wrap align-items-center mb-3">
                <div className="col-lg-6 p-2 position-relative">
                    <input
                        className="search-input"
                        placeholder="Search here"
                        value={searchchange}
                        onChange={(e) => {
                            setsearchchange(e.target.value);
                            searchevent(e.target.value, localusers);
                        }}
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
                {userdata?.length > 0 ? (
                    <TableContainer component={Paper} className="mb-4">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-light-gray">
                                    <TableCell className="bh-line">Name</TableCell>
                                    <TableCell className="bh-line">E-mail</TableCell>
                                    <TableCell className="bh-line">Birth Date</TableCell>
                                    <TableCell className="bh-line">Mobile No.</TableCell>
                                    <TableCell align="center" style={{ minWidth: '150px' }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageuserdata?.map((data, i) => (
                                    <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell className="br-line" component="th" scope="row">
                                            <div className="d-flex align-items-center">
                                                <div className="position-relative">
                                                    <div className="profile-img-table me-3">
                                                        <img
                                                            src={data.profile_picture != undefined ? `${data.profile_picture}` : noimage}
                                                            onError={({ currentTarget }) => {
                                                                currentTarget.onerror = null; // prevents looping
                                                                currentTarget.src = noimage;
                                                            }}
                                                            alt="profile"
                                                            width="100%"
                                                            className="object-fit"
                                                        />
                                                    </div>
                                                    {data.is_verified && (
                                                        <>
                                                            <div className="verified-user">
                                                                <CheckCircleFilled />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="m-0">{data.name}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="br-line">{data.email_address}</TableCell>
                                        <TableCell className="br-line">{data.dob ? new Date(data.dob).toDateString() : '-'}</TableCell>
                                        <TableCell className="br-line">
                                            {data.mobile_number ? `+${data.country_code} ${data.mobile_number}` : '-'}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip placement="top" title={'View User'}>
                                                <Link
                                                    to={`/profile/${data._id}`}
                                                    onClick={() => breadcrumbManager(data.name, `/profile/${data._id}`)}
                                                >
                                                    <div
                                                        className="me-2 action-button bg-white"
                                                        style={{ border: '1px solid #1677ff', color: '#1677ff' }}
                                                    >
                                                        <EyeOutlined />
                                                    </div>
                                                </Link>
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
                                                onConfirm={() => deleteUser(data._id)}
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
                <>
                    <Pagination
                        count={totalPage}
                        defaultPage={1}
                        color="primary"
                        className="my-5 d-flex justify-content-center"
                        page={page}
                        onChange={pageChange}
                    />
                </>
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
