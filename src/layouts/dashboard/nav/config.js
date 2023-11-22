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
    path: `/${userRole}/dashboard/visits`,
    icon: icon('ic_user'),
  },
  {
    title: 'firm Visit',
    path: `/${userRole}/dashboard/visit/firmvisit`,
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

  // {
  //   title: 'Opd Camp Report',
  //   path: `/${userRole}/dashboard/opdcapmreport`,
  //   icon: icon('ic_opd'),
  // },
  // {
  //   title: 'Greeting card',
  //   path: `/${userRole}/dashboard/greetingcard`,
  //   icon: icon('ic_greetingcard'),
  // },
  // {
  //   title: 'Chemist',
  //   path: `/${userRole}/dashboard/chemist`,
  //   icon: <BiotechIcon />,
  // },
  // {
  //   title: 'Products',
  //   path: `/${userRole}/dashboard/products`,
  //   icon: icon('ic_product'),
  // },
  // {
  //   title: 'Sells',
  //   path: `/${userRole}/dashboard/sells`,
  //   icon: icon('ic_sell'),
  // },
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
