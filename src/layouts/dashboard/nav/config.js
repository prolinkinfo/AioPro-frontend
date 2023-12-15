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
    // path: `/${userRole}/dashboard/user`,
    icon: icon('ic_visits'),
    children: [
      {
        title: 'Doctor Visit',
        path: `/${userRole}/dashboard/visits/doctorvisit`,
        // icon: icon('ic_user'),
        icon: icon('ic_product'),
      },
      {
        title: 'Firms Visit',
        path: `/${userRole}/dashboard/visits/firmvisit`,
      },
    ],
  },

  {
    title: 'People',
    // path: `/${userRole}/dashboard/user`,
    icon: icon('ic_people'),
    children: [
      {
        title: 'Administrators',
        path: `/${userRole}/dashboard/people/administrator`,
      },
      {
        title: 'Doctor',
        path: `/${userRole}/dashboard/people/doctor`,
      },
      {
        title: 'Employees',
        path: `/${userRole}/dashboard/people/employees`,
      },
    ],
  },
  {
    title: 'Calendar',
    // path: `/${userRole}/dashboard/user`,
    icon: icon('ic_calendar'),
    children: [
      {
        title: 'Holiday & Work',
        path: `/${userRole}/dashboard/calendar/holiday&work`,
      },
      {
        title: 'Leave Calendar',
        path: `/${userRole}/dashboard/calendar/leave`,
      },
    ],
  },
  {
    title: 'Expense',
    // path: `/${userRole}/dashboard/user`,
    icon: icon('ic_rupee'),
    children: [
      {
        title: 'Designation wise expense',
        path: `/${userRole}/dashboard/expenses/allowance`,
      },
      {
        title: 'Expenses',
        path: `/${userRole}/dashboard/expenses/expenses`,
      },
      {
        title: 'Day wise Expenses',
        path: `/${userRole}/dashboard/expenses/daywiseexpenses`,
      },
      {
        title: 'Expense Head',
        path: `/${userRole}/dashboard/expenses/expensehead`,
      },
      {
        title: 'Standard Fare chart',
        path: `/${userRole}/dashboard/expenses/standardfarechart`,
      },
    ],
  },
  {
    title: 'Report',
    // path: `/${userRole}/dashboard/user`,
    path: `/${userRole}/dashboard/reports`,
    icon: icon('ic_report'),
  },
  {
    title: 'Sales',
    // path: `/${userRole}/dashboard/user`,
    icon: icon('ic_sales'),
    children: [
      {
        title: 'Firms',
        path: `/${userRole}/dashboard/sales/firms`,
      },
      {
        title: 'Orders',
        path: `/${userRole}/dashboard/sales/orders`,
      },
      {
        title: 'Rate Master',
        path: `/${userRole}/dashboard/sales/ratemaster`,
      },
      {
        title: 'Secondary Sales',
        path: `/${userRole}/dashboard/sales/secondarysales`,
      },
      {
        title: 'Target',
        path: `/${userRole}/dashboard/sales/target`,
      },
      {
        title: 'Firm Monthly',
        path: `/${userRole}/dashboard/sales/firmmonthly`,
      },
    ],
  },
  {
    title: 'Files',
    path: `/${userRole}/dashboard/files`,
    icon: icon('ic_files'),
  },
  {
    title: 'Reminders',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_reminder'),
  },
  {
    title: 'Support',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_support'),
  },
  {
    title: 'HR Portal',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_portal'),
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
    // path: `/${userRole}/dashboard/user`,
    icon: icon('ic_setting'),
    children: [
      {
        title: 'Application Master',
        // path: `/${userRole}/dashboard`,
        subLink: [
          {
            title: 'Activity Type',
            path: `/${userRole}/dashboard/setting/manageActivityType`,
          },
          {
            title: 'Back Date Visit',
            path: `/${userRole}/dashboard/setting/backDateVisit`,
          },
          {
            title: 'Call Objective',
            path: `/${userRole}/dashboard/setting/callObjective`,
          },
          {
            title: 'Campaingn',
            path: `/${userRole}/dashboard/setting/campaingn`,
          },
          {
            title: 'Designation',
            path: `/${userRole}/dashboard/setting/designations`,
          },
          {
            title: 'Division',
            path: `/${userRole}/dashboard/setting/division`,
          },
          {
            title: 'Doctor Speciality',
            path: `/${userRole}/dashboard/setting/doctorSpeciality`,
          },
          {
            title: 'Doctor Category',
            path: `/${userRole}/dashboard/setting/doctorCategory`,
          },
          {
            title: 'FAQ Master',
            path: `/${userRole}/dashboard/setting/faqMaster`,
          },
          {
            title: 'Firm Category',
            path: `/${userRole}/dashboard/setting/firmCategory`,
          },
          {
            title: 'Firm type',
            path: `/${userRole}/dashboard/setting/firmType`,
          },
          {
            title: 'Fixed Allowance',
            path: `/${userRole}/dashboard`,
          },
          {
            title: 'Hospital Category',
            path: `/${userRole}/dashboard/setting/hospitalCategory`,
          },
          {
            title: 'Hospital Class',
            path: `/${userRole}/dashboard/setting/hospitalClass`,
          },

          {
            title: 'Hospital Speciality',
            path: `/${userRole}/dashboard/setting/hospitalSpeciality`,
          },

          {
            title: 'Import Data',
            path: `/${userRole}/dashboard`,
          },
          {
            title: 'Incharge Type',
            path: `/${userRole}/dashboard/setting/inchargeType`,
          },
          {
            title: 'Leave Reasons',
            path: `/${userRole}/dashboard/setting/leaveReason`,
          },
          {
            title: 'Mode Of Travel',
            path: `/${userRole}/dashboard/setting/modeOfTravel`,
          },
          {
            title: 'Others Reason',
            path: `/${userRole}/dashboard/setting/otherReason`,
          },
          {
            title: 'Product',
            path: `/${userRole}/dashboard/setting/product`,
          },
          {
            title: 'Product Indication',
            path: `/${userRole}/dashboard/setting/productIndication`,
          },
          {
            title: 'Product Samples',
            path: `/${userRole}/dashboard/setting/productSampleDetails`,
          },
          {
            title: 'Promotional Gifts',
            path: `/${userRole}/dashboard/setting/promotionalGifts`,
          },
          {
            title: 'Qualification',
            path: `/${userRole}/dashboard/setting/qualification`,
          },
          {
            title: 'Radius Settings',
            path: `/${userRole}/dashboard`,
          },
          {
            title: 'Relation Master',
            path: `/${userRole}/dashboard/setting/relationMaster`,
          },
          {
            title: 'Sample Collection',
            path: `/${userRole}/dashboard/setting/SampleCollectionCenter`,
          },
          {
            title: 'Sample / Gift With Challan',
            path: `/${userRole}/dashboard/setting/`,
          },
          {
            title: 'Scheme Master',
            path: `/${userRole}/dashboard/setting/schemeMaster`,
          },
          {
            title: 'Skipped Reasons',
            path: `/${userRole}/dashboard/setting/skippedreason`,
          },
          {
            title: 'Tax Master',
            path: `/${userRole}/dashboard/setting/taxmaster`,
          },
          {
            title: 'Test Typology',
            path: `/${userRole}/dashboard/setting/testTypology`,
          },
          {
            title: 'Type',
            path: `/${userRole}/dashboard/setting/type`,
          },
          {
            title: 'Visit Counter',
            path: `/${userRole}/dashboard/setting/visitCounter`,
          },
          {
            title: 'Work Agenda',
            path: `/${userRole}/dashboard/setting/workAgenda`,
          },
          {
            title: 'Zone',
            path: `/${userRole}/dashboard/setting/zone`,
          },
        ],
      },
      {
        title: 'Approval and Email Setting',
        // path: `/${userRole}/dashboard`,
        subLink: [
          {
            title: 'Branding',
            path: `/${userRole}/dashboard`,
          },
          {
            title: 'Change Password',
            path: `/${userRole}/dashboard/setting/changePassword`,
          },
          {
            title: 'General Settings',
            path: `/${userRole}/dashboard`,
          },
          {
            title: 'Personal Settings',
            path: `/${userRole}/dashboard`,
          },
        ],
      },
      {
        title: 'Company Settings',
        subLink: [
          {
            title: 'Change Password',
            path: `/${userRole}/dashboard/setting/changePassword`,
          },
        ],
      },
      {
        title: 'Data Settings',
        subLink: [
          {
            title: 'Data Management',
            path: `${userRole}/dashboard/setting/dataSetting/dataManagement`,
          },
          {
            title: 'Less Call',
            path: `${userRole}/dashboard`,
          },
        ],
      },
      {
        title: 'Tutorial Master',
        path: `/${userRole}/dashboard/setting/tutorialMaster`,
      },
    ],
  },
  {
    title: 'E-detailing',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_presentation'),
    children: [
      {
        title: 'Presentation',
        path: `/${userRole}/dashboard`,
      },
      {
        title: 'MediaGallery',
        path: `/${userRole}/dashboard/eDetailing/mediaGallery`,
      },
    ],
  },
  {
    title: 'Business',
    path: `/${userRole}/dashboard/user`,
    icon: icon('ic_business'),
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
    icon: icon('ic_invoice'),
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

  //   children: [
  //     {
  //       title: 'View Products',
  //       path: `/${userRole}/dashboard`,
  //     },
  //     {
  //       title: 'Add Product',
  //       path: `/${userRole}/dashboard`,
  //     },
  //   ],
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
