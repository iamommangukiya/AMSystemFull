import React, { useContext, useEffect, useState } from 'react';
import noImage from 'assets/images/imagenot.png';

import { Pagination } from '../../../node_modules/@mui/material/index';

import { Divider, Button, Modal, Popconfirm, message, Empty, Alert } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { useNavigate } from '../../../node_modules/react-router/dist/index';
import { Link } from 'react-router-dom';
import { DomainContext, PadinationContext } from 'App';
import { activeItem } from 'store/reducers/menu';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';

let editId;
let keyword = '';
const Categories = () => {
    const token = JSON.parse(localStorage.getItem('adAnimaLogin'));
    const [breadcrumb, setbreadcrumb] = useState(JSON.parse(sessionStorage.getItem('breadcrumb')));
    const baseUrl = useContext(DomainContext);
    const paginationcontext = useContext(PadinationContext);

    const localCategories = JSON.parse(localStorage.getItem('synp_categories'));

    const navigate = useNavigate();

    const [categorydata, setcattegorydata] = useState(localCategories ? localCategories : []);
    const [pagecategorydata, setpagecattegorydata] = useState([]);

    const [categoryaddload, setcategoryaddload] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (token?.is_login && token?.is_login == true) {
            dispatch(activeItem({ openItem: ['util-category'] }));
            try {
                fetch(`${baseUrl.apiBase}/categories/category_list`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    },
                    body: ''
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            localStorage.setItem('synp_categories', JSON.stringify(data.data));
                            if (keyword == '') {
                                setcattegorydata(data.data);
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

    const [modalShow, setmodalShow] = useState(false);

    const inputref = useRef();

    const [searchchange, setsearchchange] = useState('');

    const searchevent = (e, f) => {
        keyword = e;
        const newdata = f?.filter((data) => {
            let re = new RegExp(e, 'gi');
            let omg = data.category_name;
            return omg.match(re);
        });
        setcattegorydata(newdata);
        setpage(1);
    };

    const [categoryinput, setcategoryinput] = useState({ name: '', file: '' });

    const [image, setimage] = useState('');

    const [popup, setpopup] = useState({ show: false, message: '', success: true });

    useEffect(() => {
        if (popup.show) {
            setTimeout(() => {
                setpopup(false);
            }, 3000);
        }
    }, [popup]);

    const categorychange = (e) => {
        if (e.target.name == 'file') {
            if (e.target.files.length != 0) {
                const url = Array.from(e.target.files);
                const photo = url?.map((a) => {
                    return window.URL.createObjectURL(a);
                });
                setimage(photo);
                setcategoryinput({ ...categoryinput, file: e.target.files[0] });
            }
        } else {
            setcategoryinput({ ...categoryinput, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (image != '' && categoryinput.name != '') {
            setcategoryaddload(false);
        } else {
            setcategoryaddload(true);
        }
    }, [image, categoryinput]);

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

    const deleteCategory = (a) => {
        const deletdata = new FormData();
        deletdata.append('category_id', a);
        try {
            fetch(`${baseUrl.apiBase}/categories/delete_category`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token.token}`
                },
                body: deletdata
            })
                .then((response) => response.json())
                .then((data) => {
                    setpopup({ show: true, message: data.message, success: data.success });
                    if (data.success) {
                        const val = categorydata.filter((e) => {
                            return e._id != a;
                        });
                        setcattegorydata(val);
                        localStorage.setItem('synp_categories', JSON.stringify(val));
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const [editmode, seteditmode] = useState(false);

    const editcategory = (a) => {
        seteditmode(true);
        setmodalShow(true);
        categorydata?.map((data, i) => {
            if (data._id == a) {
                editId = { id: a, index: i };
                setcategoryinput({ ...categoryinput, name: data.category_name });
                setimage(`${baseUrl.imageBase}/uploads/${data.image_file}`);
            }
        });
    };

    const addcategory = () => {
        if (editmode) {
            const editdata = new FormData();
            editdata.append('category_name', categoryinput.name);
            editdata.append('category_id', editId.id);
            if (categoryinput.file != '') {
                editdata.append('category_image', categoryinput.file);
            }
            try {
                fetch(`${baseUrl.apiBase}/categories/update_category`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    },
                    body: editdata
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setpopup({ show: true, message: data.message, success: data.success });
                        if (data.success) {
                            if (categorydata[editId.index]._id == editId.id) {
                                let newdata = categorydata;
                                newdata[editId.index] = data.data;
                                setcattegorydata(newdata);
                                localStorage.setItem('synp_categories', JSON.stringify(newdata));
                                reasigndata(newdata);
                            } else {
                                const val = categorydata.filter((e) => {
                                    if (e._id == editId.id) {
                                        return data.data;
                                    } else {
                                        return e;
                                    }
                                });
                                setcattegorydata(val);
                                localStorage.setItem('synp_categories', JSON.stringify(val));
                            }
                            seteditmode(false);
                            setcategoryinput({ name: '', file: '' });
                            setmodalShow(false);
                            setimage('');
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            const adddata = new FormData();
            adddata.append('category_image', categoryinput.file);
            adddata.append('category_name', categoryinput.name);
            try {
                fetch(`${baseUrl.apiBase}/categories/add_category`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token.token}`
                    },
                    body: adddata
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setpopup({ show: true, message: data.message, success: data.success });
                        if (data.success) {
                            setcattegorydata([data.data, ...categorydata]);
                            localStorage.setItem('synp_categories', JSON.stringify([data.data, ...categorydata]));
                            setcategoryinput({ name: '', file: '' });
                            setmodalShow(false);
                            setimage('');
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const [page, setpage] = useState(paginationcontext.pagination.category);
    const [totalPage, settotalPage] = useState(1);

    const pageChange = (event, pages) => {
        setpage(pages);
        paginationcontext.setpagination({ ...paginationcontext.pagination, category: pages });
    };

    const reasigndata = (a) => {
        let value = [];
        for (var i = (page - 1) * 16; i < page * 16; i++) {
            a[i] != undefined && value.push(a[i]);
        }

        if (value?.length < 1 && page > 1) {
            setpage(page - 1);
        }
        settotalPage(Math.ceil(categorydata?.length / 16));
        setpagecattegorydata(value);
    };

    useEffect(() => {
        let value = [];
        for (var i = (page - 1) * 16; i < page * 16; i++) {
            categorydata[i] != undefined && value.push(categorydata[i]);
        }

        if (value?.length < 1 && page > 1) {
            setpage(page - 1);
        }
        settotalPage(Math.ceil(categorydata?.length / 16));
        setpagecattegorydata(value);
    }, [categorydata, page]);

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
                <p style={{ color: '#000000' }}>{'Categories'}</p>
            </div>
            <div className="col-lg-12 d-flex flex-wrap align-items-center mb-3">
                <div className="col-lg-6 p-2 position-relative">
                    <input
                        className="search-input"
                        placeholder="Search here"
                        value={searchchange}
                        onChange={(e) => {
                            setsearchchange(e.target.value);
                            searchevent(e.target.value, localCategories);
                        }}
                    />
                    <div className="search-icon">
                        <SearchOutlined />
                    </div>
                </div>
                <div className="col-lg-6 p-2 add-button">
                    <Button
                        size="large"
                        onClick={() => setmodalShow(true)}
                        className="d-flex align-items-center ms-auto bg-white add-cattegory-button"
                        type="primary"
                        ghost
                    >
                        <PlusOutlined /> Add Category
                    </Button>
                </div>
            </div>
            <Divider orientation="left" className="my-2">
                Categories
            </Divider>
            {categorydata?.length > 0 ? (
                <div className="d-flex flex-wrap">
                    {pagecategorydata?.map((data) => {
                        return (
                            <>
                                <div className="col-lg-3 p-2" key={data._id}>
                                    <div className="w-100 rounded-2 p-3 bg-white category-box">
                                        <div className="d-flex align-items-center ">
                                            <div className="profile-img-table me-3">
                                                <img
                                                    src={`${baseUrl.imageBase}/uploads/${data.image_file}`}
                                                    className="object-fit"
                                                    alt="profile"
                                                    width="100%"
                                                />
                                            </div>
                                            <h6 className="m-0" style={{ wordBreak: 'break-all' }}>
                                                {data.category_name}
                                            </h6>
                                        </div>
                                        <Divider
                                            orientation="left"
                                            className="my-2"
                                            style={{ color: 'rgba(0, 0, 0, 0.5)', fontWeight: '500', fontSize: '12px' }}
                                        >
                                            Action
                                        </Divider>
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                size="small"
                                                className="d-flex align-items-center category-small-button"
                                                type="primary"
                                                ghost
                                                onClick={() => editcategory(data._id)}
                                            >
                                                <EditOutlined /> Edit
                                            </Button>
                                            {data._id != '63bd057083e2c61c4fc4f454' && (
                                                <Popconfirm
                                                    title="Are you sure to delete this category?"
                                                    description="Are you sure to delete this task?"
                                                    onConfirm={() => deleteCategory(data._id)}
                                                    onCancel={() => {}}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button
                                                        size="small"
                                                        className="d-flex align-items-center category-small-button ms-2"
                                                        danger
                                                    >
                                                        <DeleteOutlined /> Delete
                                                    </Button>
                                                </Popconfirm>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            ) : (
                <Empty />
            )}

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

            <Modal
                title="Add Category"
                centered
                open={modalShow}
                onCancel={() => {
                    setmodalShow(false);
                    setimage('');
                    seteditmode(false);
                    setcategoryinput({ name: '', file: '' });
                }}
                footer={''}
            >
                <div className="d-flex align-items-center">
                    <div className="position-relative d-inline-block me-5">
                        <div className="profile-img-table" style={{ height: '100px', width: '100px' }}>
                            <img src={image == '' ? noImage : image} alt="profile" width="100%" className="object-fit" />
                        </div>
                        <div
                            className="d-flex justify-content-center align-items-center category-profile-add"
                            style={{ fontSize: '18px', color: '#909090' }}
                            onClick={() => inputref.current.click()}
                            role="presentation"
                        >
                            <EditOutlined />
                        </div>
                        <input type="file" className="d-none" ref={inputref} accept="image/*" name="file" onChange={categorychange} />
                    </div>
                    <div className="me-4">
                        <input
                            placeholder="Add category name"
                            style={{
                                border: 'none',
                                borderBottom: '2px solid #909090',
                                padding: '10px',
                                paddingLeft: '20px',
                                width: '100%',
                                outline: 'none'
                            }}
                            name="name"
                            value={categoryinput.name}
                            onChange={categorychange}
                        />
                    </div>
                    <div className="add-button">
                        {categoryaddload ? (
                            <>
                                <Button className="d-flex align-items-center ms-auto bg-white category-button" type="primary" ghost>
                                    <PlusOutlined /> Add
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="d-flex align-items-center ms-auto bg-white add-cattegory-button"
                                    type="primary"
                                    ghost
                                    onClick={() => {
                                        setcategoryaddload(true);
                                        addcategory();
                                    }}
                                >
                                    <PlusOutlined /> Add
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Categories;
