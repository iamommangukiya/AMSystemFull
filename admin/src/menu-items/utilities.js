// assets
import {
    AntDesignOutlined,
    FontSizeOutlined,
    AppstoreAddOutlined,
    UserOutlined,
    ProfileOutlined,
    ProjectOutlined,
    SwapOutlined,
    DeliveredProcedureOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    AntDesignOutlined,
    AppstoreAddOutlined,
    UserOutlined,
    ProfileOutlined,
    ProjectOutlined,
    SwapOutlined,
    DeliveredProcedureOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    type: 'group',
    children: [
        // {
        //     id: 'util-category',
        //     title: 'Categories',
        //     type: 'item',
        //     forPagination: 'category',
        //     url: '/categories',
        //     icon: icons.AppstoreAddOutlined
        // },
        {
            id: 'util-user',
            title: 'Users',
            type: 'item',
            forPagination: 'users',
            url: '/users',
            icon: icons.UserOutlined
        },
        {
            id: 'util-providers',
            title: 'Issues',
            type: 'item',
            forPagination: 'providers',
            url: '/Issues',
            icon: icons.ProfileOutlined
        }
        // {
        //     id: 'util-event',
        //     title: 'Events',
        //     type: 'item',
        //     forPagination: 'events',
        //     url: '/events',
        //     icon: icons.ProjectOutlined
        // },
        // {
        //     id: 'util-transaction',
        //     title: 'Transaction',
        //     type: 'item',
        //     forPagination: 'transactions',
        //     url: '/transaction',
        //     icon: icons.SwapOutlined
        // }
        // {
        //     id: 'util-shippingproduct',
        //     title: 'Shipping Products',
        //     type: 'item',
        //     forPagination: 'shippingProduct',
        //     url: '/shippingproduct',
        //     icon: icons.DeliveredProcedureOutlined
        // }
    ]
};

export default utilities;
