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
    path: `/${userRole}/dashboard/sales`,
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
    path: `/${userRole}/dashboard/reminders`,
    icon: icon('ic_reminder'),
  },
  {
    title: 'Support',
    path: `/${userRole}/dashboard/support`,
    icon: icon('ic_support'),
  },
  {
    title: 'HR Portal',
    path: `/${userRole}/dashboard/hrportal`,
    icon: icon('ic_portal'),
    children: [
      {
        title: 'Entitlements',
        path: `/${userRole}/dashboard/hrportal/entitlements`,
      },
      {
        title: 'Leave Management',
        path: `/${userRole}/dashboard/hrportal/leavemanagement`,
      },
    ],
  },
  {
    title: 'Setting',
    path: `/${userRole}/dashboard/setting`,
    icon: icon('ic_setting'),
    children: [
      {
        title: 'Application Master',
        path: `/${userRole}/dashboard/applicationMaster`,
        icon: icon(''),
        nestedChildren: [
          {
            title: 'Activity Type',
            path: `/${userRole}/dashboard/setting/applicationMaster/manageActivityType`,
          },
          {
            title: 'Back Date Visit',
            path: `/${userRole}/dashboard/setting/applicationMaster/backDateVisit`,
          },
          {
            title: 'Call Objective',
            path: `/${userRole}/dashboard/setting/applicationMaster/callObjective`,
          },
          {
            title: 'Campaingn',
            path: `/${userRole}/dashboard/setting/applicationMaster/campaingn`,
          },
          {
            title: 'Designation',
            path: `/${userRole}/dashboard/setting/applicationMaster/designations`,
          },
          {
            title: 'Division',
            path: `/${userRole}/dashboard/setting/applicationMaster/division`,
          },
          {
            title: 'Doctor Speciality',
            path: `/${userRole}/dashboard/setting/applicationMaster/doctorSpeciality`,
          },
          {
            title: 'Doctor Category',
            path: `/${userRole}/dashboard/setting/applicationMaster/doctorCategory`,
          },
          {
            title: 'FAQ Master',
            path: `/${userRole}/dashboard/setting/applicationMaster/faqMaster`,
          },
          {
            title: 'Firm Category',
            path: `/${userRole}/dashboard/setting/applicationMaster/firmCategory`,
          },
          {
            title: 'Firm type',
            path: `/${userRole}/dashboard/setting/applicationMaster/firmType`,
          },
          {
            title: 'Fixed Allowance',
            path: `/${userRole}/dashboard/setting/applicationMaster`,
          },
          {
            title: 'Hospital Category',
            path: `/${userRole}/dashboard/setting/applicationMaster/hospitalCategory`,
          },
          {
            title: 'Hospital Class',
            path: `/${userRole}/dashboard/setting/applicationMaster/hospitalClass`,
          },

          {
            title: 'Hospital Speciality',
            path: `/${userRole}/dashboard/setting/applicationMaster/hospitalSpeciality`,
          },

          {
            title: 'Import Data',
            path: `/${userRole}/dashboard/setting/applicationMaster`,
          },
          {
            title: 'Incharge Type',
            path: `/${userRole}/dashboard/setting/applicationMaster/inchargeType`,
          },
          {
            title: 'Leave Reasons',
            path: `/${userRole}/dashboard/setting/applicationMaster/leaveReason`,
          },
          {
            title: 'Mode Of Travel',
            path: `/${userRole}/dashboard/setting/applicationMaster/modeOfTravel`,
          },
          {
            title: 'Others Reason',
            path: `/${userRole}/dashboard/setting/applicationMaster/otherReason`,
          },
          {
            title: 'Product',
            path: `/${userRole}/dashboard/setting/applicationMaster/product`,
          },
          {
            title: 'Product Indication',
            path: `/${userRole}/dashboard/setting/applicationMaster/productIndication`,
          },
          {
            title: 'Product Samples',
            path: `/${userRole}/dashboard/setting/applicationMaster/productSampleDetails`,
          },
          {
            title: 'Promotional Gifts',
            path: `/${userRole}/dashboard/setting/applicationMaster/promotionalGifts`,
          },
          {
            title: 'Qualification',
            path: `/${userRole}/dashboard/setting/applicationMaster/qualification`,
          },
          {
            title: 'Radius Settings',
            path: `/${userRole}/dashboard/setting/applicationMaster`,
          },
          {
            title: 'Relation Master',
            path: `/${userRole}/dashboard/setting/applicationMaster/relationMaster`,
          },
          {
            title: 'Sample Collection',
            path: `/${userRole}/dashboard/setting/applicationMaster/SampleCollectionCenter`,
          },
          {
            title: 'Sample / Gift With Challan',
            path: `/${userRole}/dashboard/setting/applicationMaster`,
          },
          {
            title: 'Scheme Master',
            path: `/${userRole}/dashboard/setting/applicationMaster/schemeMaster`,
          },
          {
            title: 'Skipped Reasons',
            path: `/${userRole}/dashboard/setting/applicationMaster/skippedReason`,
          },
          {
            title: 'Tax Master',
            path: `/${userRole}/dashboard/setting/applicationMaster/taxMaster`,
          },
          {
            title: 'Test Typology',
            path: `/${userRole}/dashboard/setting/applicationMaster/testTypology`,
          },
          {
            title: 'Type',
            path: `/${userRole}/dashboard/setting/applicationMaster/type`,
          },
          {
            title: 'Visit Counter',
            path: `/${userRole}/dashboard/setting/applicationMaster/visitCounter`,
          },
          {
            title: 'Work Agenda',
            path: `/${userRole}/dashboard/setting/applicationMaster/workAgenda`,
          },
          {
            title: 'Zone',
            path: `/${userRole}/dashboard/setting/applicationMaster/zone`,
          },
        ],
      },

      {
        title: 'Company Settings',
        path: `/${userRole}/dashboard/setting/companySettings`,
        nestedChildren: [
          {
            title: 'Branding',
            path: `/${userRole}/dashboard/setting/companySettings/branding`,
          },
          {
            title: 'Change Password',
            path: `/${userRole}/dashboard/setting/companySettings/changePassword`,
          },
          {
            title: 'Personal Settings',
            path: `/${userRole}/dashboard/setting/companySettings/personalSettings`,
          },
        ],
      },
      {
        title: 'Data Settings',
        // path: `${userRole}/dashboard/setting/dataSetting`,
        nestedChildren: [
          {
            title: 'Data Management',
            path: `${userRole}/dashboard/setting/dataSetting/dataManagement`,
          },
          {
            title: 'Less Call',
            path: `${userRole}/dashboard/setting/dataSetting/lessCall`,
          },
        ],
      },
      {
        title: 'Approval and Email Setting',
        path: `/${userRole}/dashboard/setting/emailSetting`,
      },
      {
        title: 'Tutorial Master',
        path: `/${userRole}/dashboard/setting/tutorialMaster`,
      },
    ],
  },
  {
    title: 'E-detailing',
    path: `/${userRole}/dashboard/eDetailling`,
    icon: icon('ic_presentation'),
    children: [
      {
        title: 'Presentation',
        path: `/${userRole}/dashboard/eDetailing/presentation`,
      },
      {
        title: 'MediaGallery',
        path: `/${userRole}/dashboard/eDetailing/mediaGallery`,
      },
    ],
  },
  {
    title: 'Business',
    path: `/${userRole}/dashboard/business`,
    icon: icon('ic_business'),
    children: [
      {
        title: 'Doctor Business',
        path: `/${userRole}/dashboard/business/doctorbusiness`,
      },
      {
        title: 'Firm Business',
        path: `/${userRole}/dashboard/business/firmbusiness`,
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
