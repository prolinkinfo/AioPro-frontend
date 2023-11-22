import BiotechIcon from '@mui/icons-material/Biotech';
// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const user = JSON.parse(localStorage.getItem('user'));
const userRole = user?.role.toLowerCase();

export const adminConfig = [
  {
    title: 'Dashboard',
    path: `/${userRole}/dashboard/app`,
    icon: icon('ic_analytics'),
  },

  {
    title: 'Visits',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Doctor Visit',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Firms Visit',
        path: `/${userRole}/dashboard`,
      },
    ],
  },

  {
    title: 'People',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Administrators',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Doctor',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Employees',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
  {
    title: 'Calendar',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Holiday & Work',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Leave Calendar',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
  {
    title: 'Expense',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Designation wise expense',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Expenses',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Day wise Expenses',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Expense Head',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Standard Fare chart',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
  {
    title: 'Report',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
  },
  {
    title: 'Sales',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Firms',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Orders',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Rate Master',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Secondary Sales',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Target',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Firm Monthly',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
  {
    title: 'Files',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
  },
  {
    title: 'Reminders',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
  },
  {
    title: 'Support',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
  },
  {
    title: 'HR Portal',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Entitlements',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Leave Management',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
  {
    title: 'Setting',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Application Master',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Approval and Email Setting',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Company Settings',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Data Settings',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Tutorial Master',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
    {
    title: 'E-detailing',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Presentation',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'MediaGallery',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
    {
    title: 'Business',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
    children: [
      {
        title: 'Doctor Business',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Firm Business',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
  {
    title: 'Account & Billing',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_user'),
  },
  {
    title: 'Administrator',
    path: `/${userRole}/dashboard/administrator`,
    icon: icon('ic_user'),
  },
  // {
  //   title: 'User Management',
  //   path: `/${userRole}/dashboard/user`,
  //   icon: icon('ic_user'),
  // },

  {
    title: 'Opd Camp Report',
    path: `/${userRole}/dashboard/opdcapmreport`,
    icon: icon('ic_opd'),

    children: [
      {
        title: 'View Products',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'Add Product',
        path: `/${userRole}/dashboard`,
      },
    ],
  },
  {
    title: 'Greeting card',
    path: `/${userRole}/dashboard/greetingcard`,
    icon: icon('ic_greetingcard'),
  },
  {
    title: 'Chemist',
    path: `/${userRole}/dashboard/chemist`,
    icon: <BiotechIcon />,
  },
  {
    title: 'Products',
    path: `/${userRole}/dashboard/products`,
    icon: icon('ic_product'),
  },
  {
    title: 'Sells',
    path: `/${userRole}/dashboard/sells`,
    icon: icon('ic_sell'),
  },
];

export const nmConfig = [
  {
    title: 'Dashboard',
    path: '/nm/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User Management',
    path: `/nm/dashboard/user`,
    icon: icon('ic_user'),
  },
];

export const bmConfig = [
  {
    title: 'Dashboard',
    path: '/bm/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User Management',
    path: `/bm/dashboard/user`,
    icon: icon('ic_user'),
  },
];

export const zmConfig = [
  {
    title: 'Dashboard',
    path: '/zm/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User Management',
    path: `/zm/dashboard/user`,
    icon: icon('ic_user'),
  },
];

export const rmConfig = [
  {
    title: 'Dashboard',
    path: '/rm/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User Management',
    path: `/rm/dashboard/user`,
    icon: icon('ic_user'),
  },
];
export const tmConfig = [
  {
    title: 'Dashboard',
    path: '/tm/dashboard/app',
    icon: icon('ic_analytics'),
  },
];
