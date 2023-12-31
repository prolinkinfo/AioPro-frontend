import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
import User from '../pages/user';
import UserView from '../pages/user/View';
import Lead from '../pages/Lead/Lead';
import Page404 from '../pages/Page404';
import DashboardAppPage from '../pages/DashboardAppPage';
import LeadView from '../pages/Lead/View';
import Contact from '../pages/contact/Contact';
import ContactView from '../pages/contact/View';
import Calendar from '../pages/Calendar/Calendar';
import Document from '../pages/documents/Documents';
import Calls from '../pages/calls/Call';
import CallsView from '../pages/calls/View';
import Meeting from '../pages/meeting/Meeting';
import MeetingView from '../pages/meeting/View';
import Email from '../pages/email/Email';
import EmailView from '../pages/email/View';
import Task from '../pages/task/Task';
import TaskView from '../pages/task/View';
import EmailTemplate from '../pages/settings/Settings';
import AddEmailTemplate from '../pages/settings/Add';
import ViewEmailTemplate from '../pages/settings/View';
// ----------------------------------------------------------------------

export default function NmRouters() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();

  const nm = userRole === 'National Manager' ? 'nm' : '';
  const nmRoutes = useRoutes([
    {
      path: `/nm/dashboard`,
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={`/nm/dashboard/app`} />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <User /> },
        { path: 'user/view/:id', element: <UserView /> },
        { path: 'lead', element: <Lead /> },
        { path: 'lead/view/:id', element: <LeadView /> },
        { path: 'contact', element: <Contact /> },
        { path: 'contact/view/:id', element: <ContactView /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'document', element: <Document /> },
        { path: 'call', element: <Calls /> },
        { path: 'call/view/:id', element: <CallsView /> },
        { path: 'meeting', element: <Meeting /> },
        { path: 'meeting/view/:id', element: <MeetingView /> },
        { path: 'email', element: <Email /> },
        { path: 'email/view/:id', element: <EmailView /> },
        { path: 'task', element: <Task /> },
        { path: 'task/view/:id', element: <TaskView /> },
        { path: 'emailtemplate', element: <EmailTemplate /> },
        { path: 'emailtemplate/add', element: <AddEmailTemplate /> },
        { path: 'emailtemplate/view/:id', element: <ViewEmailTemplate /> },
        { path: '*', element: <Navigate to={`/nm/dashboard/app`} />, index: true },
        { path: '404', element: <Page404 /> },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { path: '*', element: <Navigate to={`/nm/dashboard/app`} />, index: true },
        // { path: '404', element: <Page404 /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return nmRoutes;
}
