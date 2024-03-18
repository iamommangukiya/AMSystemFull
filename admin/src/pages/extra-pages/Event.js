import React, { useContext, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Carousel from 'react-bootstrap/Carousel';

import { UncontrolledCarousel } from 'reactstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Autoplay } from 'swiper';

import { Pagination } from '../../../node_modules/@mui/material/index';

import { Divider, Popconfirm, message, Modal, Tooltip, Tag, Empty, Alert, Button } from 'antd';
import { StopOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, StopFilled, CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from '../../../node_modules/react-router/dist/index';
import { Link } from 'react-router-dom';
import { DomainContext, PadinationContext } from 'App';
import { activeItem } from 'store/reducers/menu';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';

let keyword = '';
const Event = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const baseUrl = useContext(DomainContext);
    const paginationcontext = useContext(PadinationContext);
    const [breadcrumb, setbreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (token?.is_login && token?.is_login == true) {
            dispatch(activeItem({ openItem: ['util-event'] }));
            try {
                fetch(`${baseUrl.apiBase}/event_detail/all_event_list`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    },
                    body: ''
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            localStorage.setItem('synp_events', JSON.stringify(data.data));
                            if (keyword == '') {
                                seteventdata(data.data);
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

    const [eventmodal, seteventmodal] = useState(false);
    const [items, setitems] = useState([]);

    const localevents = JSON.parse(localStorage.getItem('synp_events'));
    const [eventdata, seteventdata] = useState(localevents ? localevents : []);
    const [pageeventdata, setpageeventdata] = useState([]);

    const [searchchange, setsearchchange] = useState('');
    const [popup, setpopup] = useState({ show: false, message: '', success: true });

    const [oneeventData, setoneeventData] = useState({});

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
            return pre.event_title.match(re);
        });
        seteventdata(newdata);
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

    // ================== Delete Product ==================

    const deleteevent = (a) => {
        const deleteeventdata = new FormData();
        deleteeventdata.append('event_id', a);
        try {
            fetch(`${baseUrl.apiBase}/event_detail/delete_event`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: deleteeventdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        const val = eventdata.filter((e) => {
                            return e._id != a;
                        });
                        seteventdata(val);
                        localStorage.setItem('synp_events', JSON.stringify(val));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    // ======================= Block Event and Unblock Event ============================

    const blockevent = (a) => {
        const blockeventdata = new FormData();
        blockeventdata.append('event_id', a);
        try {
            fetch(`${baseUrl.apiBase}/event_detail/block_event`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: blockeventdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        const val = eventdata?.map((e) => {
                            if (e._id == a) {
                                return { ...e, is_block: !e.is_block };
                            } else {
                                return e;
                            }
                        });
                        seteventdata(val);
                        localStorage.setItem('synp_events', JSON.stringify(val));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const [page, setpage] = useState(paginationcontext.pagination.events);
    const [totalPage, settotalPage] = useState(1);

    const pageChange = (event, pages) => {
        setpage(pages);
        paginationcontext.setpagination({ ...paginationcontext.pagination, events: pages });
        // let value = [];
        // for (var i = (pages - 1) * 10; i < pages * 10; i++) {
        //     eventdata[i] != undefined && value.push(data[i]);
        // }
        // setpageeventdata(value);
    };

    useEffect(() => {
        let value = [];
        for (var i = (page - 1) * 10; i < page * 10; i++) {
            eventdata[i] != undefined && value.push(eventdata[i]);
        }
        if (value?.length < 1 && page > 1) {
            setpage(page - 1);
        }
        settotalPage(Math.ceil(eventdata?.length / 10));
        setpageeventdata(value);
    }, [eventdata, page]);

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
                <p style={{ color: '#000000' }}>{'Events'}</p>
            </div>
            <div className="col-lg-12 d-flex flex-wrap align-items-center mb-3">
                <div className="col-lg-6 p-2 position-relative">
                    <input
                        className="search-input"
                        placeholder="Search here"
                        value={searchchange}
                        onChange={(e) => {
                            setsearchchange(e.target.value);
                            searchevent(e.target.value, localevents);
                        }}
                    />
                    <div className="search-icon">
                        <SearchOutlined />
                    </div>
                </div>
                {/* <div className="col-lg-6 p-2 add-button">
                    <Button
                        size="large"
                        onClick={() => setmodalShow(true)}
                        className="d-flex align-items-center ms-auto bg-white "
                        type="primary"
                        ghost
                    >
                        <PlusOutlined /> Add Category
                    </Button>
                </div> */}
            </div>
            <Divider orientation="left" className="my-2">
                Events
            </Divider>

            <div className="p-2">
                {eventdata?.length > 0 ? (
                    <TableContainer component={Paper} className="mb-4">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-light-gray">
                                    <TableCell className="bh-line">Event Name</TableCell>
                                    <TableCell className="bh-line">Date</TableCell>
                                    <TableCell className="bh-line">Time</TableCell>
                                    <TableCell className="bh-line">Address</TableCell>
                                    <TableCell className="bh-line">Created By</TableCell>
                                    <TableCell align="center" style={{ minWidth: '150px' }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageeventdata?.map((data, i) => {
                                    var date = new Date(data.event_date_time).toLocaleDateString();
                                    var time = new Date(data.event_date_time).toLocaleTimeString();
                                    const [hour, minute, second] = time.split(':');
                                    var finaltime;
                                    if (time.includes('AM') || time.includes('PM')) {
                                        finaltime = time;
                                    } else {
                                        finaltime = hour >= 12 ? `${hour == 12 ? 12 : hour - 12}:${minute} PM` : `${hour}:${minute} AM`;
                                    }
                                    return (
                                        <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell className="br-line" component="th" scope="row">
                                                <div className="d-flex align-items-center">
                                                    <div className="profile-img-table me-3">
                                                        <img
                                                            src={
                                                                data.image[0]?.file_type == 'image'
                                                                    ? `${baseUrl.imageBase}/uploads/${data.image[0]?.image_file}`
                                                                    : `${baseUrl.imageBase}/uploads/${data.image[1]?.image_file}`
                                                            }
                                                            alt="profile"
                                                            width="100%"
                                                            className="object-fit"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="m-0">{data.event_title}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="br-line">{`${date}`}</TableCell>
                                            <TableCell className="br-line">{finaltime}</TableCell>
                                            <TableCell className="br-line">{data?.address}</TableCell>
                                            <TableCell className="br-line">{data?.user_id?.user_name}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip placement="top" title={'View Event'}>
                                                    <div
                                                        className="me-2 action-button bg-white"
                                                        style={{ border: '1px solid #1677ff', color: '#1677ff' }}
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
                                                                    file_type: image?.file_type
                                                                });
                                                            });
                                                            setitems(imageArray);
                                                        }}
                                                        role="presentation"
                                                    >
                                                        <EyeOutlined />
                                                    </div>
                                                </Tooltip>
                                                {data.is_block ? (
                                                    <>
                                                        <Popconfirm
                                                            title="Are you sure to unblock this event?"
                                                            description="Are you sure to unblock this event?"
                                                            onConfirm={() => {
                                                                blockevent(data._id);
                                                            }}
                                                            onCancel={() => {}}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Tooltip placement="top" title={'Unblock Event'}>
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
                                                            title="Are you sure to block this event?"
                                                            description="Are you sure to block this event?"
                                                            onConfirm={() => {
                                                                blockevent(data._id);
                                                            }}
                                                            onCancel={() => {}}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <Tooltip placement="top" title={'Block Event'}>
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
                                                    title="Are you sure to delete this event?"
                                                    description="Are you sure to delete this event?"
                                                    onConfirm={() => deleteevent(data._id)}
                                                    onCancel={() => {}}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Tooltip placement="top" title={'Delete Event'}>
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
                                    );
                                })}
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
            <Modal title="Event Details" centered open={eventmodal} onCancel={() => seteventmodal(false)} footer={''} width="600px">
                <div className="w-100 ">
                    <div className="w-100 mt-2 rounded-2 bg-white" style={{ height: '300px', overflow: 'hidden' }}>
                        {/* <UncontrolledCarousel interval={2000} items={items} style={{ height: '100%' }} /> */}
                        <Swiper
                            modules={[Navigation, A11y, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
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
                            <Link
                                to={`/profile/${oneeventData?.data?.user_id?._id}`}
                                onClick={() =>
                                    breadcrumbManager(
                                        oneeventData?.data?.user_id?.user_name,
                                        `/profile/${oneeventData?.data?.user_id?._id}`
                                    )
                                }
                            >
                                <Button size="small" className="d-flex align-items-center me-2" type="primary" ghost>
                                    <EyeOutlined /> View
                                </Button>
                            </Link>
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
        </>
    );
};

export default Event;
