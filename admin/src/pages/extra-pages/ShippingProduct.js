import React, { useContext, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Pagination } from '../../../node_modules/@mui/material/index';

import { Divider, Popconfirm, message, Tooltip, Tag, Empty, Alert, Select } from 'antd';
import { StopOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, StopFilled } from '@ant-design/icons';
import { useNavigate } from '../../../node_modules/react-router/dist/index';
import { Link } from 'react-router-dom';
import { DomainContext, PadinationContext } from 'App';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';
import { activeItem } from 'store/reducers/menu';
import noimage from 'assets/images/image.jpg';

let keyword = '';
let categorieskey = 'All';

const ShippingProduct = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const localCategories = JSON.parse(localStorage.getItem('synp_categories'));
    const baseUrl = useContext(DomainContext);
    const paginationcontext = useContext(PadinationContext);
    const [breadcrumb, setbreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const navigate = useNavigate();
    const [filter, setfilter] = useState({ category: categorieskey, type: categorieskey });
    const [categories, setcategories] = useState([
        {
            value: 'All',
            label: 'All'
        }
    ]);
    const localproducts = JSON.parse(localStorage.getItem('synp_shippingproducts'));
    const [productdata, setproductdata] = useState(localproducts ? localproducts : []);

    const dispatch = useDispatch();

    useEffect(() => {
        if (token?.is_login && token?.is_login == true) {
            dispatch(activeItem({ openItem: ['util-shippingproduct'] }));
            try {
                fetch(`${baseUrl.apiBase}/post_detail/shipping_post_list`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    },
                    body: ''
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            localStorage.setItem('synp_shippingproducts', JSON.stringify(data.data));
                            if (keyword == '') {
                                if (categorieskey == 'All') {
                                    setproductdata(data.data);
                                } else {
                                    const newdata = data.data?.filter((pre) => {
                                        let re = new RegExp(categorieskey, 'gi');
                                        return pre?.category_id?.category_name?.match(re);
                                    });
                                    setproductdata(newdata);
                                }
                            } else {
                                searchevent(keyword, data.data);
                            }
                        }
                    });
            } catch (err) {
                console.log(err);
            }
            let catarr = [
                {
                    value: 'All',
                    label: 'All'
                }
            ];
            localCategories?.map((data) => {
                catarr.push({ value: data.category_name, label: data.category_name });
            });
            setcategories(catarr);
        } else {
            navigate('/login');
        }
    }, []);

    const [pageproductdata, setpageproductdata] = useState([]);

    const [searchchange, setsearchchange] = useState(keyword);
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
        categorieskey = 'All';
        setfilter({ ...filter, category: 'All' });
        const newdata = f?.filter((pre) => {
            let re = new RegExp(e, 'gi');
            return pre.name.match(re);
        });
        setproductdata(newdata);
        setpage(1);
    };

    const breadcrumbManager = (a, b) => {
        let bread = [];
        let prepath = false;
        for (var i = 0; i < breadcrumb.length; i++) {
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

    const deleteProduct = (a) => {
        const deleteproductdata = new FormData();
        deleteproductdata.append('post_id', a);
        try {
            fetch(`${baseUrl.apiBase}/post_detail/delete_post`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: deleteproductdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        const val = productdata.filter((e) => {
                            return e._id != a;
                        });
                        setproductdata(val);
                        localStorage.setItem('synp_shippingproducts', JSON.stringify(val));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    // ======================= Block Product and Unblock Product ============================

    const blockProduct = (a) => {
        const blockproductdata = new FormData();
        blockproductdata.append('post_id', a);
        try {
            fetch(`${baseUrl.apiBase}/post_detail/block_post`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: blockproductdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        const val = productdata?.map((e) => {
                            if (e._id == a) {
                                return { ...e, is_block: !e.is_block };
                            } else {
                                return e;
                            }
                        });
                        setproductdata(val);
                        localStorage.setItem('synp_shippingproducts', JSON.stringify(val));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const [page, setpage] = useState(paginationcontext.pagination.shippingProduct);
    const [totalPage, settotalPage] = useState(1);

    const pageChange = (event, pages) => {
        setpage(pages);
        paginationcontext.setpagination({ ...paginationcontext.pagination, shippingProduct: pages });
        // let value = [];
        // for (var i = (pages - 1) * 10; i < pages * 10; i++) {
        //     productdata[i] != undefined && value.push(data[i]);
        // }
        // setpageproductdata(value);
    };

    useEffect(() => {
        let value = [];
        for (var i = (page - 1) * 10; i < page * 10; i++) {
            productdata[i] != undefined && value.push(productdata[i]);
        }
        if (value?.length < 1 && page > 1) {
            setpage(page - 1);
        }
        settotalPage(Math.ceil(productdata?.length / 10));
        setpageproductdata(value);
    }, [productdata, page]);

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
    }, [productdata]);

    return (
        <>
            <div className="breadcrumb d-flex align-items-center">
                <p style={{ color: '#000000' }}>{'Shipping Products'}</p>
            </div>
            <div className="col-lg-12 d-flex flex-wrap align-items-center mb-3">
                <div className="col-lg-6 p-2 position-relative">
                    <input
                        className="search-input"
                        placeholder="Search here"
                        value={searchchange}
                        onChange={(e) => {
                            setsearchchange(e.target.value);
                            searchevent(e.target.value, localproducts);
                        }}
                    />
                    <div className="search-icon">
                        <SearchOutlined />
                    </div>
                </div>
                <div className="col-lg-6 p-2 add-button d-flex justify-contant-end">
                    <div className="d-inline-block ms-auto">
                        <span className="me-2">Categories</span>
                        <Select
                            showSearch
                            value={filter.category}
                            style={{
                                width: 150
                            }}
                            placeholder="Search"
                            options={categories}
                            onChange={(data) => {
                                setfilter({ ...filter, category: data });
                                if (data == 'All') {
                                    setproductdata(localproducts);
                                } else {
                                    keyword = '';
                                    setsearchchange('');
                                    categorieskey = data;
                                    const newdata = localproducts?.filter((pre) => {
                                        let re = new RegExp(data, 'gi');
                                        return pre.category_id.category_name.match(re);
                                    });
                                    setproductdata(newdata);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <Divider orientation="left" className="my-2">
                Shipping Product
            </Divider>

            <div className="p-2">
                {productdata?.length > 0 ? (
                    <TableContainer component={Paper} className="mb-4">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="bg-light-gray">
                                    <TableCell className="bh-line">Product Name</TableCell>
                                    <TableCell className="bh-line">Category</TableCell>
                                    <TableCell className="bh-line">Post Type</TableCell>
                                    <TableCell className="bh-line">Price</TableCell>
                                    <TableCell className="bh-line">Sold/Unsold</TableCell>
                                    <TableCell className="bh-line">Bids</TableCell>
                                    <TableCell className="bh-line">Comments</TableCell>
                                    <TableCell align="center" style={{ minWidth: '150px' }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pageproductdata?.map((data) => (
                                    <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell className="br-line" component="th" scope="row">
                                            <div className="d-flex align-items-center">
                                                <div className="profile-img-table me-3">
                                                    <img
                                                        src={
                                                            data.image != undefined ? `${baseUrl.imageBase}/uploads/${data.image}` : noimage
                                                        }
                                                        alt="profile"
                                                        width="100%"
                                                        className="object-fit"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="m-0">{data.name}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="br-line">{data.category_id.category_name}</TableCell>
                                        <TableCell className="br-line">{data.post_type}</TableCell>
                                        <TableCell className="br-line">{data.price}</TableCell>
                                        <TableCell className="br-line">
                                            {data.is_sold ? <Tag color="volcano">Sold</Tag> : <Tag color="green">Unsold</Tag>}
                                        </TableCell>
                                        <TableCell className="br-line">{data.bid}</TableCell>
                                        <TableCell className="br-line">{data.comment}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip placement="top" title={'View Product'}>
                                                <Link
                                                    to={`/productdetails/${data._id}`}
                                                    onClick={() => breadcrumbManager(data.name, `/productdetails/${data._id}`)}
                                                >
                                                    <div
                                                        className="me-2 action-button bg-white"
                                                        style={{ border: '1px solid #1677ff', color: '#1677ff' }}
                                                    >
                                                        <EyeOutlined />
                                                    </div>
                                                </Link>
                                            </Tooltip>
                                            {data.is_block ? (
                                                <>
                                                    <Popconfirm
                                                        title="Are you sure to Unblock this product?"
                                                        description="Are you sure to Unblock this product?"
                                                        onConfirm={() => blockProduct(data._id)}
                                                        onCancel={() => {}}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Tooltip placement="top" title={'Unblock Product'}>
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
                                                        title="Are you sure to block this product?"
                                                        description="Are you sure to block this product?"
                                                        onConfirm={() => blockProduct(data._id)}
                                                        onCancel={() => {}}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <Tooltip placement="top" title={'Block Product'}>
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
                                                title="Are you sure to delete this product?"
                                                description="Are you sure to delete this product?"
                                                onConfirm={() => {
                                                    deleteProduct(data._id);
                                                }}
                                                onCancel={() => {}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Tooltip placement="top" title={'Delete Product'}>
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

export default ShippingProduct;
