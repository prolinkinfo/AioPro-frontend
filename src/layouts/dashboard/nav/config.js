// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'Lead Management',
  //   path: '/dashboard/lead',
  //   icon: icon('ic_lead'),
  // },
  // {
  //   title: 'Contact Management',
  //   path: '/dashboard/contact',
  //   icon: icon('ic_contact'),
  // },
  // {
  //   title: 'Policy Management',
  //   path: '/dashboard/policy',
  //   icon: icon('ic_policy'),
  // },
  // {
  //   title: 'Tasks',
  //   path: '/dashboard/task',
  //   icon: icon('ic_task'),
  // },
  // {
  //   title: 'Meetings',
  //   path: '/dashboard/meeting',
  //   icon: icon('ic_meeting'),
  // },
  // {
  //   title: 'Calls',
  //   path: '/dashboard/call',
  //   icon: icon('ic_call'),
  // },
  // {
  //   title: 'Calendar',
  //   path: '/dashboard/calendar',
  //   icon: icon('ic_calendar'),
  // },
  // {
  //   title: 'Document Management',
  //   path: '/dashboard/document',
  //   icon: icon('ic_document'),
  // },
  {
    title: 'User Management',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'System Settings',
    path: '/dashboard/settings',
    icon: icon('ic_user'),
  },
  {
    title: 'Opd Camp Report',
    path: '/dashboard/opdcapmreport',
    icon: icon('ic_opd'),
  },
];

export default navConfig;
