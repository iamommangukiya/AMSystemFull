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
import { BASE_URL, BASE_URL1 } from 'Configration';

let keyword = '';

const Providers = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const baseUrl = useContext(DomainContext);
    const [breadcrumb, setbreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const paginationcontext = useContext(PadinationContext);

    useEffect(() => {
        if (token?.is_login && token?.is_login == true) {
            try {
                fetch(`${BASE_URL1}/getissue`, {
                    method: 'get'
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data.data);
                        if (data.flag) {
                            setissue(data.data);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate('/login');
        }
    }, []);

    const localusers = JSON.parse(localStorage.getItem('ad_providers'));

    const [issue, setissue] = useState([]);

    const [pageissue, setpageissue] = useState([]);
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
        setissue(newdata);
        setpage(1);
    };

    const updateIssueStatus = (issueId, status) => {
        // Perform API call to update the status of the issue in your database
        console.log(issueId);
        try {
            fetch(`${BASE_URL1}/updateIssue`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: issueId, status })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // Handle response data accordingly
                    if (data.success) {
                        // Update the issue status in your local state or data source
                        const updatedIssues = issue.map((item) => {
                            if (item.id === issueId) {
                                return { ...item, status: status };
                            }
                            return item;
                        });
                        setIssue(updatedIssues);
                    } else {
                        // Handle error or show notification
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    // Handle error
                });
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };
    // ================== Delete User ==================

    const handledelete = (id) => {
        try {
            fetch(`${BASE_URL1}/deleteissue?id=${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.flag });
                    if (data.flag) {
                        const val = issue.filter((e) => {
                            return e.id != id;
                        });
                        setissue(val);
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    // ======================= Block User and Unblock User ============================

    const blockUser = (a) => {
        const blockissue = new FormData();
        blockissue.append('user_id', a);
        try {
            fetch(`${BASE_URL}/user_details/block_unblock_user`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: blockissue
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        const val = issue?.map((e) => {
                            if (e._id == a) {
                                return { ...e, is_active: !e.is_active };
                            } else {
                                return e;
                            }
                        });
                        setissue(val);
                        localStorage.setItem('ad_providers', JSON.stringify(val));
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
            issue[i] != undefined && value.push(issue[i]);
        }
        if (value?.length < 1 && page > 1) {
            setpage(page - 1);
        }
        settotalPage(Math.ceil(issue?.length / 10));
        setpageissue(value);
    }, [issue, page]);
    useEffect(() => {
        // Initialize selectedStatus based on initial issue data
        const initialSelectedStatus = {};
        issue.forEach((data) => {
            initialSelectedStatus[data.id] = data.status;
        });
        setSelectedStatus(initialSelectedStatus);
    }, [issue]);

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
    const [selectedStatus, setSelectedStatus] = useState({});
    const [showFullText, setShowFullText] = useState(false);
    const handleStatusChange = (status, issueId) => {
        setSelectedStatus({ ...selectedStatus, [issueId]: status });
        updateIssueStatus(issueId, status);
    };
    return (
        <>
            <div className="breadcrumb d-flex align-items-center">
                <p style={{ color: '#000000' }}>{'Issues'}</p>
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
            <Divider orientation="left" className="my-2 text-center">
                Issues
            </Divider>
            <div className="p-2">
                {issue?.length > 0 ? (
                    <TableContainer component={Paper} className="mb-4">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-light-gray">
                                    <TableCell className="bh-line">Sr No.</TableCell>
                                    <TableCell className="bh-line">Company id</TableCell>
                                    <TableCell className="bh-line">Module name</TableCell>
                                    <TableCell className="bh-line">issue</TableCell>

                                    <TableCell align="center" style={{ minWidth: '150px' }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageissue?.map((data, i) => (
                                    <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell className="br-line" component="th" scope="row">
                                            <div className="d-flex align-items-center">
                                                <div className="position-relative">
                                                    <div className="profile-img-table me-3"></div>
                                                    <p>{i + 1}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="br-line">{data.CompanyId}</TableCell>
                                        <TableCell className="br-line">{data.module}</TableCell>
                                        <TableCell className="br-line ">
                                            <Tooltip title={data.problem} mouseEnterDelay={0.5} arrowPointAtCenter>
                                                <span>{data.problem}</span>
                                            </Tooltip>
                                        </TableCell>

                                        <TableCell align="center d-flex justify-content-around">
                                            <div>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`status_${data.id}`}
                                                        value="solved"
                                                        checked={selectedStatus[data.id] === 'solved'}
                                                        onChange={() => handleStatusChange('solved', data.id)}
                                                    />
                                                    Solved
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`status_${data.id}`}
                                                        value="pending"
                                                        checked={selectedStatus[data.id] === 'pending'}
                                                        onChange={() => handleStatusChange('pending', data.id)}
                                                    />
                                                    Pending
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`status_${data.id}`}
                                                        value="rejected"
                                                        checked={selectedStatus[data.id] === 'rejected'}
                                                        onChange={() => handleStatusChange('rejected', data.id)}
                                                    />
                                                    Rejected
                                                </label>
                                            </div>
                                            <div>
                                                <Tooltip placement="top" title={'Delete User'}>
                                                    <div
                                                        className="action-button bg-white"
                                                        style={{ border: '1px solid #ff4d4f', color: '#ff4d4f' }}
                                                    >
                                                        <button onClick={() => handledelete(data.id)}>
                                                            <DeleteOutlined />
                                                        </button>
                                                    </div>
                                                </Tooltip>
                                            </div>
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

export default Providers;
