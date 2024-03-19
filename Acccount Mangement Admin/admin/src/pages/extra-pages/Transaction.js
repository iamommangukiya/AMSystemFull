import React, { useContext, useEffect, useState } from 'react';
import { SearchOutlined, RightOutlined } from '@ant-design/icons';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import { Pagination } from '../../../node_modules/@mui/material/index';
import { Divider, Tooltip, Empty } from 'antd';
import { activeItem } from 'store/reducers/menu';
import { Link } from 'react-router-dom';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { DomainContext, PadinationContext } from 'App';
import noimage from 'assets/images/image.jpg';

let keyword = '';

const Transaction = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const [breadcrumb, setbreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const baseUrl = useContext(DomainContext);
    const paginationcontext = useContext(PadinationContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const localtransaction = JSON.parse(localStorage.getItem('synp_transaction'));

    const [searchchange, setsearchchange] = useState('');
    const [transaction, settransaction] = useState(localtransaction ? localtransaction : []);
    const [pagetransaction, setpagetransaction] = useState([]);

    const searchevent = (e, f) => {
        const newdata = f?.filter((pre) => {
            let re = new RegExp(e, 'gi');
            return (
                pre?.from_user?.user_name?.match(re) ||
                pre?.to_user?.user_name?.match(re) ||
                pre?.product_name?.match(re) ||
                pre?.transaction_id?.match(re)
            );
        });
        settransaction(newdata);
        setpage(1);
    };

    const paymentMethod = {
        wallet: 'Wallet',
        card: 'Card',
        gpay: 'Google Pay',
        net_banking: 'Net Banking',
        paypal: 'Paypal'
    };

    useEffect(() => {
        if (token?.is_login && token?.is_login == true) {
            dispatch(activeItem({ openItem: ['util-transaction'] }));
            try {
                fetch(`${baseUrl.apiBase}/payment_history/transaction_history`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token?.token}`
                    },
                    body: ''
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            localStorage.setItem('synp_transaction', JSON.stringify(data.data));
                            if (keyword == '') {
                                settransaction(data.data);
                            } else {
                                searchevent(keyword, data.data);
                            }
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate('/login');
        }
    }, []);

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

    const [page, setpage] = useState(paginationcontext.pagination.transactions);
    const [totalPage, settotalPage] = useState(1);

    useEffect(() => {
        let value = [];
        for (var i = (page - 1) * 10; i < page * 10; i++) {
            transaction[i] != undefined && value.push(transaction[i]);
        }
        if (value?.length < 1 && page > 1) {
            setpage(page - 1);
        }
        settotalPage(Math.ceil(transaction.length / 10));
        setpagetransaction(value);
    }, [transaction, page]);

    const pageChange = (event, pages) => {
        setpage(pages);
        paginationcontext.setpagination({ ...paginationcontext.pagination, transactions: pages });
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

    return (
        <>
            <div className="breadcrumb d-flex align-items-center">
                <p style={{ color: '#000000' }}>{'Transaction'}</p>
            </div>
            <div className="col-lg-12 d-flex flex-wrap align-items-center mb-3">
                <div className="col-lg-6 p-2 position-relative">
                    <input
                        className="search-input"
                        placeholder="Search here"
                        value={searchchange}
                        onChange={(e) => {
                            setsearchchange(e.target.value);
                            searchevent(e.target.value, localtransaction);
                        }}
                    />
                    <div className="search-icon">
                        <SearchOutlined />
                    </div>
                </div>
            </div>
            <Divider orientation="left" className="my-2">
                Transaction
            </Divider>
            <div className="w-100 p-2">
                {pagetransaction?.map((data, i) => {
                    var date = new Date(data?.transfer_time).toLocaleDateString();
                    var time = new Date(data?.transfer_time).toLocaleTimeString();
                    const [hour, minute, second] = time.split(':');
                    var finaltime;
                    if (time.includes('AM') || time.includes('PM')) {
                        finaltime = time;
                    } else {
                        finaltime = hour >= 12 ? `${hour == 12 ? 12 : hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
                    }
                    console.log(data);
                    return (
                        <>
                            {data.payment_for == 'transfer' && (
                                <div className="transaction category-box w-100 rounded-3 mb-3 bg-white" key={`payment${i}`}>
                                    <div className="transaction-top w-100 p-3 d-flex justify-content-between">
                                        <h6 className="m-0">
                                            {data.transaction_id && (
                                                <Tooltip placement="top" title={'Transaction ID'}>
                                                    {data.transaction_id}
                                                </Tooltip>
                                            )}
                                        </h6>
                                        <h6 className="m-0">By {paymentMethod[data.payment_method]}</h6>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-3 border-right p-3 d-flex flex-wrap">
                                            <div>
                                                <h6 className="mb-3 w-100">Product Details</h6>
                                                {data?.product_image ? (
                                                    <Link
                                                        to={`/productdetails/${data.product_id}`}
                                                        onClick={() =>
                                                            breadcrumbManager(data.product_name, `/productdetails/${data.product_id}`)
                                                        }
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <div className="profile-img-table me-3">
                                                                <img
                                                                    src={
                                                                        data?.product_image != undefined
                                                                            ? `${baseUrl.imageBase}/uploads/${data?.product_image}`
                                                                            : noimage
                                                                    }
                                                                    alt="profile"
                                                                    width="100%"
                                                                    className="object-fit"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="m-0 text-black">{data.product_name}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <div className="d-flex align-items-center">
                                                        <div className="profile-img-table me-3">
                                                            <img
                                                                src={
                                                                    data?.product_image != undefined
                                                                        ? `${baseUrl.imageBase}/uploads/${data?.product_image}`
                                                                        : noimage
                                                                }
                                                                alt="profile"
                                                                width="100%"
                                                                className="object-fit"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="m-0 text-black">{data.product_name}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center col-6 justify-content-around border-right">
                                            <Link
                                                to={`/profile/${data.from_user?._id}`}
                                                onClick={() =>
                                                    breadcrumbManager(data.from_user?.user_name, `/profile/${data.from_user?._id}`)
                                                }
                                            >
                                                <div className="text-center p-3" style={{ width: '200px' }}>
                                                    <div className="profile-img-table m-auto mb-2">
                                                        <img
                                                            src={
                                                                data?.from_user?.profile_picture != undefined
                                                                    ? `${baseUrl.imageBase}/uploads/${data?.from_user?.profile_picture}`
                                                                    : noimage
                                                            }
                                                            alt="profile"
                                                            width="100%"
                                                            className="object-fit"
                                                        />
                                                    </div>
                                                    <div style={{ maxWidth: '200px' }}>
                                                        <p className="m-0 text-black">{data?.from_user?.user_name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="text-center p-3" style={{ width: '250px' }}>
                                                <div className="position-relative transaction-price" style={{ display: 'inline-block' }}>
                                                    <h5 className="card-price px-3">
                                                        <Tooltip placement="top" title={'Transfer Amount'}>
                                                            ${data.transfer_amount}
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={'Platform Fees'}>
                                                            <span className="h6"> +{data.platform_fees}</span>
                                                        </Tooltip>
                                                    </h5>
                                                    <div className="aerrow">
                                                        <RightOutlined />
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/profile/${data.to_user?._id}`}
                                                onClick={() => breadcrumbManager(data.to_user?.user_name, `/profile/${data.to_user?._id}`)}
                                            >
                                                <div className="text-center p-3" style={{ width: '200px' }}>
                                                    <div className="profile-img-table m-auto mb-2">
                                                        <img
                                                            src={
                                                                data?.to_user?.profile_picture != undefined
                                                                    ? `${baseUrl.imageBase}/uploads/${data?.to_user?.profile_picture}`
                                                                    : noimage
                                                            }
                                                            alt="profile"
                                                            width="100%"
                                                            className="object-fit"
                                                        />
                                                    </div>
                                                    <div style={{ maxWidth: '200px' }}>
                                                        <p className="m-0 text-black">{data?.to_user?.user_name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="col-3 border-right h-100 p-3 align-items-center">
                                            <h6 className="mb-3">Other Details</h6>
                                            <div className="d-flex flex-wrap align-items-center">
                                                <div className="p-0 mb-1 px-0 d-flex w-100">
                                                    <p className="m-0 col-4">Payment For</p>
                                                    <span className="col-8" style={{ color: 'rgb(168 168 168)' }}>
                                                        {'Transfer'}
                                                    </span>
                                                </div>
                                                <div className="p-0 mb-1 px-0 d-flex w-100">
                                                    <p className="m-0 col-4">Transaction Time</p>
                                                    <span className="col-8" style={{ color: 'rgb(168 168 168)' }}>
                                                        {`${date} at ${finaltime}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {data.payment_for == 'add_money' && (
                                <div className="transaction category-box w-100 rounded-3 mb-3 bg-white" key={`payment${i}`}>
                                    <div className="transaction-top w-100 p-3 d-flex justify-content-between">
                                        <h6 className="m-0">
                                            {data.transaction_id && (
                                                <Tooltip placement="top" title={'Transaction ID'}>
                                                    {data.transaction_id}
                                                </Tooltip>
                                            )}
                                        </h6>
                                        <h6 className="m-0">By {paymentMethod[data.payment_method]}</h6>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-3 border-right p-3 d-flex flex-wrap">
                                            <div>
                                                <h6 className="mb-3 w-100">Product Details</h6>
                                                <p style={{ color: 'rgb(168 168 168)' }}>Not Found</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center col-6 justify-content-around border-right">
                                            <Link
                                                to={`/profile/${data.from_user?._id}`}
                                                onClick={() =>
                                                    breadcrumbManager(data.from_user?.user_name, `/profile/${data.from_user?._id}`)
                                                }
                                            >
                                                <div className="text-center p-3" style={{ width: '200px' }}>
                                                    <div className="profile-img-table m-auto mb-2">
                                                        <img
                                                            src={
                                                                data?.from_user?.profile_picture != undefined
                                                                    ? `${baseUrl.imageBase}/uploads/${data?.from_user?.profile_picture}`
                                                                    : noimage
                                                            }
                                                            alt="profile"
                                                            width="100%"
                                                            className="object-fit"
                                                        />
                                                    </div>
                                                    <div style={{ maxWidth: '200px' }}>
                                                        <p className="m-0 text-black">{data?.from_user?.user_name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="text-center p-3" style={{ width: '250px' }}>
                                                <div className="position-relative transaction-add" style={{ display: 'inline-block' }}>
                                                    <h5 className="card-price pe-3 py-2">
                                                        <Tooltip placement="top" title={'Transfer Amount'}>
                                                            ${data.transfer_amount}
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={'Platform Fees'}>
                                                            <span className="h6"> +{data.platform_fees}</span>
                                                        </Tooltip>
                                                    </h5>
                                                    <div className="aerrow">
                                                        <RightOutlined />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-center p-3" style={{ width: '200px' }}>
                                                <div className="profile-img-table m-auto mb-2">
                                                    <div
                                                        className="profile-img-table me-3 d-flex justify-content-center align-items-center bg-light-green text-success h5 mb-0"
                                                        style={{ transform: 'rotate(180deg)' }}
                                                    >
                                                        <NorthOutlinedIcon />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="m-0 text-black">{'Add to Wallet'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 border-right h-100 p-3 align-items-center">
                                            <h6 className="mb-3">Other Details</h6>
                                            <div className="d-flex flex-wrap align-items-center">
                                                <div className="p-0 mb-1 px-0 d-flex w-100">
                                                    <p className="m-0 col-4">Payment For</p>
                                                    <span className="col-8" style={{ color: 'rgb(168 168 168)' }}>
                                                        {'Add Money'}
                                                    </span>
                                                </div>
                                                <div className="p-0 mb-1 px-0 d-flex w-100">
                                                    <p className="m-0 col-4">Transaction Time</p>
                                                    <span className="col-8" style={{ color: 'rgb(168 168 168)' }}>
                                                        {`${date} at ${finaltime}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {data.payment_for == 'withdraw' && (
                                <div className="transaction category-box w-100 rounded-3 mb-3 bg-white" key={`payment${i}`}>
                                    <div className="transaction-top w-100 p-3 d-flex justify-content-between">
                                        <h6 className="m-0">
                                            {data.transaction_id && (
                                                <Tooltip placement="top" title={'Transaction ID'}>
                                                    {data.transaction_id}
                                                </Tooltip>
                                            )}
                                        </h6>
                                        <h6 className="m-0">By {paymentMethod[data.payment_method]}</h6>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-3 border-right p-3 d-flex flex-wrap">
                                            <div>
                                                <h6 className="mb-3 w-100">Product Details</h6>
                                                <p style={{ color: 'rgb(168 168 168)' }}>Not Found</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center col-6 justify-content-around border-right">
                                            <Link
                                                to={`/profile/${data.from_user?._id}`}
                                                onClick={() =>
                                                    breadcrumbManager(data.from_user?.user_name, `/profile/${data.from_user?._id}`)
                                                }
                                            >
                                                <div className="text-center p-3" style={{ width: '200px' }}>
                                                    <div className="profile-img-table m-auto mb-2">
                                                        <img
                                                            src={
                                                                data?.from_user?.profile_picture != undefined
                                                                    ? `${baseUrl.imageBase}/uploads/${data?.from_user?.profile_picture}`
                                                                    : noimage
                                                            }
                                                            alt="profile"
                                                            width="100%"
                                                            className="object-fit"
                                                        />
                                                    </div>
                                                    <div style={{ maxWidth: '200px' }}>
                                                        <p className="m-0 text-black">{data?.from_user?.user_name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="text-center p-3" style={{ width: '250px' }}>
                                                <div className="position-relative transaction-withdraw" style={{ display: 'inline-block' }}>
                                                    <h5 className="card-price ps-3 py-2">
                                                        <Tooltip placement="top" title={'Transfer Amount'}>
                                                            ${data.transfer_amount}
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={'Platform Fees'}>
                                                            <span className="h6"> +{data.platform_fees}</span>
                                                        </Tooltip>
                                                    </h5>
                                                    <div className="aerrow">
                                                        <RightOutlined />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center p-3" style={{ width: '200px' }}>
                                                <div className="profile-img-table m-auto mb-2">
                                                    <div
                                                        className="profile-img-table me-3 d-flex justify-content-center align-items-center bg-light-red text-danger h5 mb-0"
                                                        style={{ transform: 'rotate(0deg)' }}
                                                    >
                                                        <NorthOutlinedIcon />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="m-0 text-black">{'Withdraw from Wallet'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 border-right h-100 p-3 align-items-center">
                                            <h6 className="mb-3">Other Details</h6>
                                            <div className="d-flex flex-wrap align-items-center">
                                                <div className="p-0 mb-1 px-0 d-flex w-100">
                                                    <p className="m-0 col-4">Payment For</p>
                                                    <span className="col-8" style={{ color: 'rgb(168 168 168)' }}>
                                                        {'Withdraw Money'}
                                                    </span>
                                                </div>
                                                <div className="p-0 mb-1 px-0 d-flex w-100">
                                                    <p className="m-0 col-4">Transaction Time</p>
                                                    <span className="col-8" style={{ color: 'rgb(168 168 168)' }}>
                                                        {`${date} at ${finaltime}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })}
                {transaction.length < 1 && <Empty />}
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
        </>
    );
};

export default Transaction;
