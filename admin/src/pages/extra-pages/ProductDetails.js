import React, { useContext, useEffect, useState } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Button, Tag, Steps, Skeleton, Modal, Empty } from 'antd';
import { CheckCircleFilled, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from '../../../node_modules/react-router/dist/index';
import { Link, useParams } from 'react-router-dom';
import { DomainContext } from 'App';
// import avatar1 from 'assets/images/users/avatar-1.png';

const ProductDetails = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const baseUrl = useContext(DomainContext);
    const [breadcrumb, setbreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const navigate = useNavigate();

    const { product_id } = useParams();

    const [items, setitems] = useState([]);
    const [reportedCommentLoad, setreportedCommentLoad] = useState(true);
    const [reportcommentdata, setreportcommentdata] = useState();
    const [reportcommentList, setreportcommentList] = useState();

    const [productdetails, setproductdetails] = useState({});
    const [commentList, setcommentList] = useState([]);
    const [reportList, setreportList] = useState([]);
    const [orderDetails, setorderDetails] = useState({});
    const [paymentInfo, setpaymentInfo] = useState([]);
    const [orderCount, setorderCount] = useState(6);
    const [orderdata, setorderdata] = useState([]);
    const [checkOrder, setcheckOrder] = useState(false);
    const [adminShippingOrderData, setadminShippingOrderData] = useState({ firstpart: [], currentStatus: {}, secondpart: [] });

    const dataUpdate = () => {
        const productId = new FormData();
        productId.append('post_id', product_id);
        Promise.all([
            fetch(`${baseUrl.apiBase}/post_detail/comment_list`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: productId
            }).then((response) => response.json()),
            fetch(`${baseUrl.apiBase}/post_detail/report_post_list`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: productId
            }).then((response) => response.json()),
            fetch(`${baseUrl.apiBase}/post_detail/post_order_detail`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: productId
            }).then((response) => response.json())
        ]).then((values) => {
            if (values[0].success) {
                setcommentList(values[0].data);
            }
            if (values[1].success) {
                setreportList(values[1].data);
            }
            if (values[2].success) {
                setorderDetails(values[2].data);
                setproductdetails(values[2].data);
                let imageItem = [];
                values[2].data?.image?.map((image) => {
                    imageItem.push({ src: `${baseUrl.imageBase}/uploads/${image.image_file}`, file_type: image.file_type });
                });
                setitems(imageItem);
                if (values[2].data?.order_status?.length > 0) {
                    let ordervalue = [];
                    let adminOdervalue = { firstpart: [], currentStatus: {}, secondpart: [] };
                    const orderKey = Object.keys(values[2].data?.order_status[0]);
                    let countset = true;
                    orderKey?.map((data, i) => {
                        if (data != '_id') {
                            var date = new Date(values[2]?.data?.order_status[0]?.[data]?.order_update_date).toLocaleDateString();
                            var time = new Date(values[2]?.data?.order_status[0]?.[data]?.order_update_date).toLocaleTimeString();
                            const [hour, minute, second] = time.split(':');
                            let finaldate;
                            if (time.includes('AM') || time.includes('PM')) {
                                finaldate = `${date} at ${time}`;
                            } else {
                                finaldate =
                                    hour >= 12
                                        ? `${date} at ${hour == 12 ? 12 : hour - 12}:${minute} PM`
                                        : `${date} at ${hour}:${minute} AM`;
                            }

                            if (values[2].data?.order_status[0]?.[data].is_status_update) {
                                ordervalue.push({
                                    title: data,
                                    description: finaldate
                                });
                                adminOdervalue.firstpart.push({
                                    title: data,
                                    description: finaldate
                                });
                            } else {
                                ordervalue.push({ title: data });
                                if (countset) {
                                    setorderCount(i - 1);
                                }
                                if (!countset) {
                                    adminOdervalue.secondpart.push({ title: data });
                                } else {
                                    adminOdervalue.currentStatus = { title: data, _id: values[2].data?.order_status[0]._id };
                                }
                                countset = false;
                            }
                        }
                    });
                    setorderdata(ordervalue);
                    setadminShippingOrderData(adminOdervalue);
                }
            }
            setload(false);
        });
    };

    useEffect(() => {
        if (token?.is_login && token?.is_login == true) {
            dataUpdate();
        } else {
            navigate('/login');
        }
    }, []);

    const [load, setload] = useState(true);

    const [reportCommentModal, setreportCommentModal] = useState(false);

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

    const reportComment = (a) => {
        const reportId = new FormData();
        reportId.append('comment_id', a);
        fetch(`${baseUrl.apiBase}/post_detail/comment_report_list`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.token}`
            },
            body: reportId
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setreportcommentList(data.data);
                    setreportedCommentLoad(false);
                }
            });
    };

    const processOrder = () => {
        const orderdata = new FormData();
        orderdata.append('order_status_id', adminShippingOrderData.currentStatus._id);
        orderdata.append('ordered_status', `is_${adminShippingOrderData.currentStatus.title}`);
        fetch(`${baseUrl.apiBase}/post_detail/edit_order_status`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.token}`
            },
            body: orderdata
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    dataUpdate();
                    setcheckOrder(false);
                }
            });
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
    }, []);

    return (
        <>
            <div className="breadcrumb d-flex align-items-center">
                {breadcrumb?.map((e, i) => {
                    return (
                        <>
                            {i != breadcrumb?.length - 1 ? (
                                <>
                                    <Link key={e.url} to={e.url} onClick={() => breadcrumbManager(e.name, e.url)}>
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
                <>
                    <div className="w-100 row">
                        <div className="col-lg-6 profilemodal p-2" style={{ height: '430px' }}>
                            <div className="w-100 rounded-2 bg-white slider-skeleton" style={{ height: '100%', overflow: 'hidden' }}>
                                <Skeleton.Image active={true} block={true} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                        <div className="col-lg-6 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100 p-3" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <h6 className=" m-0 mb-1 ">
                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                    </h6>
                                    <div className="p-2 px-0 d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center">
                                            <div className="profile-img-table me-3">
                                                <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                            </div>
                                            <div>
                                                <h6 className="m-0">
                                                    <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                </h6>
                                            </div>
                                        </div>
                                        <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                    </div>
                                    <h6 className=" m-0 mb-3">
                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                    </h6>
                                    <div className="p-0 mb-1 px-0 d-flex ">
                                        <p className="m-0 col-lg-4">
                                            <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                        </p>
                                        <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                            <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                        </span>
                                    </div>
                                    <div className="p-0 mb-1 px-0 d-flex ">
                                        <p className="m-0 col-lg-4">
                                            <div style={{ overflow: 'hidden', width: '50px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </p>
                                        <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                            <div style={{ overflow: 'hidden', width: '100px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </span>
                                    </div>
                                    <div className="p-0 mb-1 px-0 d-flex ">
                                        <p className="m-0 col-lg-4">
                                            <div style={{ overflow: 'hidden', width: '100px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </p>
                                        <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                            <div style={{ overflow: 'hidden', width: '50px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </span>
                                    </div>
                                    <div className="p-0 mb-1 px-0 d-flex ">
                                        <p className="m-0 col-lg-4">
                                            <div style={{ overflow: 'hidden', width: '30px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </p>
                                        <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                            <div style={{ overflow: 'hidden', width: '120px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </span>
                                    </div>
                                    <div className="p-0 mb-1 px-0 d-flex ">
                                        <p className="m-0 col-lg-4">
                                            <div style={{ overflow: 'hidden', width: '80px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </p>
                                        <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                            <div style={{ overflow: 'hidden', width: '50px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </span>
                                    </div>
                                    <div className="p-0 mb-1 px-0 d-flex ">
                                        <p className="m-0 col-lg-4">
                                            <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                        </p>
                                        <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                            <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                        </span>
                                    </div>
                                    <div className="p-0 mb-1 px-0 d-flex ">
                                        <p className="m-0 col-lg-4">
                                            <div style={{ overflow: 'hidden', width: '50px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </p>
                                        <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                            <div style={{ overflow: 'hidden', width: '100px' }}>
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Product Details</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        <li className="p-3 " style={{ borderBottom: '1px solid #f1f1f1' }}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="profile-img-table me-3">
                                                        <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                    </div>
                                                    <div>
                                                        <h6 className="m-0">
                                                            <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                        </h6>
                                                    </div>
                                                </div>
                                                <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                    <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                </p>
                                            </div>
                                            <p className="m-0 pt-2 message-skeleton">
                                                <Skeleton.Input
                                                    active={true}
                                                    size={'small'}
                                                    shape={'round'}
                                                    block={true}
                                                    style={{ height: '10px' }}
                                                />{' '}
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </p>
                                        </li>
                                        <li className="p-3 " style={{ borderBottom: '1px solid #f1f1f1' }}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="profile-img-table me-3">
                                                        <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                    </div>
                                                    <div>
                                                        <h6 className="m-0">
                                                            <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                        </h6>
                                                    </div>
                                                </div>
                                                <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                    <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                </p>
                                            </div>
                                            <p className="m-0 pt-2 message-skeleton">
                                                <Skeleton.Input
                                                    active={true}
                                                    size={'small'}
                                                    shape={'round'}
                                                    block={true}
                                                    style={{ height: '10px' }}
                                                />{' '}
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </p>
                                        </li>
                                        <li className="p-3 " style={{ borderBottom: '1px solid #f1f1f1' }}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="profile-img-table me-3">
                                                        <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                    </div>
                                                    <div>
                                                        <h6 className="m-0">
                                                            <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                        </h6>
                                                    </div>
                                                </div>
                                                <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                    <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                </p>
                                            </div>
                                            <p className="m-0 pt-2 message-skeleton">
                                                <Skeleton.Input
                                                    active={true}
                                                    size={'small'}
                                                    shape={'round'}
                                                    block={true}
                                                    style={{ height: '10px' }}
                                                />{' '}
                                                <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Comments</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Report Post</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Biding history</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100 p-0" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Order Status</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                        <li
                                            className="p-3 d-flex justify-content-between align-items-center"
                                            style={{ borderBottom: '1px solid #f1f1f1' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                                </div>
                                                <div>
                                                    <h6 className="m-0 mb-1">
                                                        <Skeleton.Button active={true} size={15} shape={'round'} block={true} />
                                                    </h6>
                                                    <p className="m-0" style={{ height: '10px', color: 'rgb(168 168 168)' }}>
                                                        <Skeleton.Input active={true} size={10} shape={'round'} block={true} />
                                                    </p>
                                                </div>
                                            </div>
                                            <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Payment Info.</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-100 row">
                        <div className="col-lg-6 profilemodal p-2" style={{ height: '430px' }}>
                            <div className="w-100 rounded-2 bg-white" style={{ height: '100%', overflow: 'hidden' }}>
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
                                                        <track
                                                            src="captions_en.vtt"
                                                            kind="captions"
                                                            srclang="en"
                                                            label="english_captions"
                                                        ></track>
                                                    </video>
                                                )}
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        </div>
                        <div className="col-lg-6 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100 p-3" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <h6 className=" m-0 mb-1 ">Created By</h6>
                                    <div className="p-2 px-0 d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center">
                                            <div className="position-relative">
                                                <div className="profile-img-table me-3">
                                                    <img
                                                        src={`${baseUrl.imageBase}/uploads/${productdetails?.user_id?.profile_picture}`}
                                                        alt="profile"
                                                        width="100%"
                                                        className="object-fit"
                                                    />
                                                </div>
                                                {productdetails?.user_id?.is_verified && (
                                                    <>
                                                        <div className="verified-user">
                                                            <CheckCircleFilled />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div>
                                                <h6 className="m-0">{productdetails?.user_id?.user_name}</h6>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/profile/${productdetails?.user_id?._id}`}
                                            onClick={() =>
                                                breadcrumbManager(
                                                    productdetails?.user_id?.user_name,
                                                    `/profile/${productdetails?.user_id?._id}`
                                                )
                                            }
                                        >
                                            <Button size="small" className="d-flex align-items-center me-2" type="primary" ghost>
                                                <EyeOutlined /> View
                                            </Button>
                                        </Link>
                                    </div>
                                    <h6 className=" m-0 mb-3">Products details</h6>
                                    <div className="p-0 mb-1 px-0 d-flex ">
                                        <p className="m-0 col-lg-4">Product Name </p>
                                        <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                            {productdetails?.pet_name ? productdetails?.pet_name : productdetails?.title}
                                        </span>
                                    </div>
                                    {productdetails?.category_id && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Category </p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {productdetails?.category_id?.category_name}
                                            </span>
                                        </div>
                                    )}
                                    {productdetails?.post_type && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Post Type</p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {productdetails?.post_type?.name}
                                            </span>
                                        </div>
                                    )}
                                    {productdetails?.pet_breed && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Breed</p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {productdetails?.pet_breed}
                                            </span>
                                        </div>
                                    )}
                                    {productdetails?.pet_gender && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Gender</p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {productdetails?.pet_gender}
                                            </span>
                                        </div>
                                    )}
                                    {productdetails?.pet_age && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Age</p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {productdetails?.pet_age}
                                            </span>
                                        </div>
                                    )}
                                    {productdetails?.price && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Price </p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                $ {productdetails?.price}
                                            </span>
                                        </div>
                                    )}
                                    {productdetails?.minimum_bid_price && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Minimum bid price </p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                $ {productdetails?.minimum_bid_price}
                                            </span>
                                        </div>
                                    )}
                                    {productdetails?.address && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Address</p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {productdetails?.address}
                                            </span>
                                        </div>
                                    )}
                                    {productdetails?.description && (
                                        <div className="p-0 mb-1 px-0 d-flex ">
                                            <p className="m-0 col-lg-4">Descrition</p>
                                            <span className="col-lg-8" style={{ color: 'rgb(168 168 168)' }}>
                                                {productdetails?.description}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Product Details</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        {commentList?.map((data) => {
                                            var date = new Date(data?.created_at).toLocaleDateString();
                                            var time = new Date(data?.created_at).toLocaleTimeString();
                                            const [hour, minute, second] = time.split(':');
                                            let finaldate;
                                            if (time.includes('AM') || time.includes('PM')) {
                                                finaldate = `${date} at ${time}`;
                                            } else {
                                                finaldate =
                                                    hour >= 12
                                                        ? `${date} at ${hour == 12 ? 12 : hour - 12}:${minute} PM`
                                                        : `${date} at ${hour}:${minute} AM`;
                                            }
                                            return (
                                                <li className="p-3 " style={{ borderBottom: '1px solid #f1f1f1' }} key={data._id}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <div className="position-relative">
                                                                <div className="profile-img-table me-3">
                                                                    <img
                                                                        src={`${baseUrl.imageBase}/uploads/${data.user_id?.profile_picture}`}
                                                                        alt="profile"
                                                                        width="100%"
                                                                        className="object-fit"
                                                                    />
                                                                </div>
                                                                {data.user_id?.is_verified && (
                                                                    <>
                                                                        <div className="verified-user">
                                                                            <CheckCircleFilled />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h6 className="m-0">
                                                                    {data.user_id?.user_name}
                                                                    {data.report_counter != 0 && (
                                                                        <Tag
                                                                            color="red"
                                                                            className="ms-1"
                                                                            onClick={() => {
                                                                                setreportCommentModal(true);
                                                                                setreportcommentdata({ ...data, date: finaldate });
                                                                                reportComment(data._id);
                                                                            }}
                                                                            style={{ cursor: 'pointer' }}
                                                                        >
                                                                            Reported
                                                                        </Tag>
                                                                    )}
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                            {finaldate}
                                                        </p>
                                                    </div>
                                                    <p className="m-0 pt-2">{data.comment}</p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className="m-auto mt-3">{commentList?.length < 1 && <Empty />}</div>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0 d-flex justify-content-between">
                                        Comments <span>{commentList?.length}</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        {reportList?.map((data) => {
                                            return (
                                                <li
                                                    key={data._id}
                                                    className="p-3 d-flex justify-content-between align-items-center"
                                                    style={{ borderBottom: '1px solid #f1f1f1' }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className="position-relative">
                                                            <div className="profile-img-table me-3">
                                                                <img
                                                                    src={`${baseUrl.imageBase}/uploads/${data.user_id?.profile_picture}`}
                                                                    alt="profile"
                                                                    width="100%"
                                                                    className="object-fit"
                                                                />
                                                            </div>
                                                            {data.user_id?.is_verified && (
                                                                <>
                                                                    <div className="verified-user">
                                                                        <CheckCircleFilled />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h6 className="m-0">{data.user_id?.user_name}</h6>
                                                            <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                                Reason : {data.report_reason}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        to={`/profile/${data.user_id?._id}`}
                                                        onClick={() =>
                                                            breadcrumbManager(data.user_id?.user_name, `/profile/${data.user_id?._id}`)
                                                        }
                                                    >
                                                        <Button
                                                            size="small"
                                                            className="d-flex align-items-center me-2"
                                                            type="primary"
                                                            ghost
                                                        >
                                                            <EyeOutlined /> View
                                                        </Button>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className="m-auto mt-3">{reportList?.length < 1 && <Empty />}</div>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0 d-flex justify-content-between">
                                        Report <span>{reportList?.length}</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        {orderDetails?.bid_history?.map((data) => {
                                            var date = new Date(data?.created_at).toLocaleDateString();
                                            var time = new Date(data?.created_at).toLocaleTimeString();
                                            const [hour, minute, second] = time.split(':');
                                            let finaldate;
                                            if (time.includes('AM') || time.includes('PM')) {
                                                finaldate = `${date} at ${time}`;
                                            } else {
                                                finaldate =
                                                    hour >= 12
                                                        ? `${date} at ${hour == 12 ? 12 : hour - 12}:${minute} PM`
                                                        : `${date} at ${hour}:${minute} AM`;
                                            }
                                            return (
                                                <li
                                                    key={data._id}
                                                    className="p-3 d-flex justify-content-between align-items-center"
                                                    style={{ borderBottom: '1px solid #f1f1f1' }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className="position-relative">
                                                            <div className="profile-img-table me-3">
                                                                <img
                                                                    src={`${baseUrl.imageBase}/uploads/${data.bid_by?.profile_picture}`}
                                                                    alt="profile"
                                                                    width="100%"
                                                                    className="object-fit"
                                                                />
                                                            </div>
                                                            {data.bid_by?.is_verified && (
                                                                <>
                                                                    <div className="verified-user">
                                                                        <CheckCircleFilled />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h6 className="m-0">{data.bid_by?.user_name}</h6>
                                                            <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                                {finaldate}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <h5 className="card-price m-0">$ {data.bid_amount}</h5>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className="m-auto mt-3">{orderDetails?.bid_history?.length < 1 && <Empty />}</div>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0 d-flex justify-content-between">
                                        Biding history <span>{orderDetails?.bid_history?.length}</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                {orderDetails?.is_want_shipping && orderCount < 5 ? (
                                    <>
                                        <div
                                            className="w-100 p-3 custom-order"
                                            style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}
                                        >
                                            <Steps direction="vertical" current={orderCount} items={adminShippingOrderData.firstpart} />
                                            <>
                                                <div className="d-flex align-items-center" style={{ marginBottom: '20px' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={checkOrder}
                                                        style={{ height: '20px', width: '20px', marginLeft: '5px' }}
                                                        onClick={() => {
                                                            setcheckOrder(!checkOrder);
                                                        }}
                                                    />
                                                    <p className="m-0 ms-22" style={{ fontSize: '16px' }}>
                                                        {adminShippingOrderData.currentStatus.title}
                                                    </p>
                                                    {orderCount != 5 && (
                                                        <>
                                                            {checkOrder ? (
                                                                <>
                                                                    <Button
                                                                        className="d-flex align-items-center ms-auto bg-white add-cattegory-button"
                                                                        type="primary"
                                                                        ghost
                                                                        onClick={() => {
                                                                            processOrder();
                                                                        }}
                                                                    >
                                                                        Process
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <Button
                                                                    className="d-flex align-items-center ms-auto bg-white category-button"
                                                                    type="primary"
                                                                    ghost
                                                                >
                                                                    Process
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                            <Steps
                                                direction="vertical"
                                                initial={orderCount + 1}
                                                current={-1}
                                                items={adminShippingOrderData.secondpart}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="w-100 p-3 custom-order"
                                            style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}
                                        >
                                            <Steps direction="vertical" current={orderCount} items={orderdata} />
                                            <div className="m-auto mt-3">{orderDetails?.order_status?.length < 1 && <Empty />}</div>
                                        </div>
                                    </>
                                )}
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0">Order Status</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 profilemodal p-2" style={{ height: '430px' }}>
                            <div
                                className="w-100 rounded-2 bg-white position-relative followlist"
                                style={{ height: '100%', overflow: 'hidden' }}
                            >
                                <div className="w-100" style={{ height: 'calc(100% - 54px)', marginTop: '54px', overflow: 'scroll' }}>
                                    <ul className="m-0 p-0">
                                        {orderDetails?.payment_history?.map((data) => {
                                            var date = new Date(data?.created_at).toLocaleDateString();
                                            var time = new Date(data?.created_at).toLocaleTimeString();
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
                                                    <li
                                                        className="p-3 d-flex justify-content-between align-items-center"
                                                        style={{ borderBottom: '1px solid #f1f1f1' }}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <div className="profile-img-table me-3">
                                                                <img
                                                                    src={`${baseUrl.imageBase}/uploads/${data?.from_user_id?.profile_picture}`}
                                                                    alt="profile"
                                                                    width="100%"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h6 className="m-0">{data?.from_user_id?.user_name}</h6>
                                                                <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                                    {`${date} at ${finaltime}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <h6 className="paid-card-price m-0">{`Paid $${data?.transfer_amount}`}</h6>
                                                    </li>
                                                </>
                                            );
                                        })}
                                    </ul>
                                    <div className="m-auto mt-3">{!orderDetails?.payment_history && <Empty />}</div>
                                </div>
                                <div
                                    className="p-3 position-absolute w-100"
                                    style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}
                                >
                                    <h6 className="m-0 d-flex justify-content-between">
                                        Payment Info. <span></span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Modal
                title="Reported Comment"
                centered
                open={reportCommentModal}
                onCancel={() => {
                    setreportedCommentLoad(true);
                    setreportCommentModal(false);
                }}
                footer={''}
                width="600px"
            >
                <div className="w-100 rounded-2 bg-white position-relative followlist" style={{ height: '100%', overflow: 'hidden' }}>
                    <div className="w-100" style={{ height: '500px', marginTop: '125px', overflow: 'scroll' }}>
                        <ul className="m-0 p-0">
                            {reportedCommentLoad ? (
                                <>
                                    <li
                                        className="p-2 d-flex justify-content-between align-items-center"
                                        style={{ borderBottom: '1px solid #f1f1f1' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div className="profile-img-table me-3">
                                                <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                            </div>
                                            <div>
                                                <Skeleton.Button active={true} size={20} shape={'round'} block={true} />
                                            </div>
                                        </div>
                                        <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                    </li>
                                    <li
                                        className="p-2 d-flex justify-content-between align-items-center"
                                        style={{ borderBottom: '1px solid #f1f1f1' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div className="profile-img-table me-3">
                                                <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                            </div>
                                            <div>
                                                <Skeleton.Button active={true} size={20} shape={'round'} block={true} />
                                            </div>
                                        </div>
                                        <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                    </li>
                                    <li
                                        className="p-2 d-flex justify-content-between align-items-center"
                                        style={{ borderBottom: '1px solid #f1f1f1' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div className="profile-img-table me-3">
                                                <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                            </div>
                                            <div>
                                                <Skeleton.Button active={true} size={20} shape={'round'} block={true} />
                                            </div>
                                        </div>
                                        <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                    </li>
                                    <li
                                        className="p-2 d-flex justify-content-between align-items-center"
                                        style={{ borderBottom: '1px solid #f1f1f1' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div className="profile-img-table me-3">
                                                <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                            </div>
                                            <div>
                                                <Skeleton.Button active={true} size={20} shape={'round'} block={true} />
                                            </div>
                                        </div>
                                        <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                    </li>
                                    <li
                                        className="p-2 d-flex justify-content-between align-items-center"
                                        style={{ borderBottom: '1px solid #f1f1f1' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div className="profile-img-table me-3">
                                                <Skeleton.Button active={true} size={'large'} shape={'circle'} />
                                            </div>
                                            <div>
                                                <Skeleton.Button active={true} size={20} shape={'round'} block={true} />
                                            </div>
                                        </div>
                                        <Skeleton.Button active={true} size={'small'} shape={'round'} />
                                    </li>
                                </>
                            ) : (
                                <>
                                    {reportcommentList?.map((data) => {
                                        return (
                                            <li
                                                key={data._id}
                                                className="p-3 d-flex justify-content-between align-items-center"
                                                style={{ borderBottom: '1px solid #f1f1f1' }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className="profile-img-table me-3">
                                                        <img
                                                            src={`${baseUrl.imageBase}/uploads/${data?.user_id?.profile_picture}`}
                                                            alt="profile"
                                                            width="100%"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6 className="m-0">{data?.user_id?.user_name}</h6>
                                                        <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                                            Reason : {data?.report_reason}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/profile/${data?.user_id?._id}`}
                                                    onClick={() => {
                                                        breadcrumbManager(data.user_id?.user_name, `/profile/${data?.user_id?._id}`);
                                                    }}
                                                >
                                                    <Button size="small" className="d-flex align-items-center me-2" type="primary" ghost>
                                                        <EyeOutlined /> View
                                                    </Button>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </>
                            )}
                        </ul>
                    </div>
                    <div className=" position-absolute w-100" style={{ borderBottom: '1px solid #0dbcec', color: '#0dbcec', top: '0px' }}>
                        <li className="p-3 " style={{ borderBottom: '1px solid #f1f1f1' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="profile-img-table me-3">
                                        <img
                                            src={`${baseUrl.imageBase}/uploads/${reportcommentdata?.user_id?.profile_picture}`}
                                            alt="profile"
                                            width="100%"
                                        />
                                    </div>
                                    <div>
                                        <h6 className="m-0">
                                            {reportcommentdata?.user_id?.user_name} <Tag color="red">Reported</Tag>
                                        </h6>
                                    </div>
                                </div>
                                <p className="m-0" style={{ fontSize: '12px', color: 'rgb(168 168 168)' }}>
                                    {reportcommentdata?.date}
                                </p>
                            </div>
                            <p className="m-0 pt-2 comment-line-css">{reportcommentdata?.comment}</p>
                        </li>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ProductDetails;
