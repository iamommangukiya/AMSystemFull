// assets
import { ChromeOutlined, QuestionOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined,
    ProfileOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.ChromeOutlined
        },
        {
            id: 'table-page',
            title: 'Tables',
            type: 'item',
            url: '/tablepage',
            icon: icons.ProfileOutlined
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/mantis-react/',
            icon: icons.QuestionOutlined,
            external: true,
            target: true
        }
    ]
};

export default support;
