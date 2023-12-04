import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
//
import User from '../pages/user';
import Event from '../pages/user/Event';
import UserView from '../pages/user/View';
import Lead from '../pages/Lead/Lead';
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
// import Setting from '../pages/settings/Settings';
import AddEmailTemplate from '../pages/settings/Add';
import ViewEmailTemplate from '../pages/settings/View';
import { Hierarchy } from '../pages/Hierarchy/hierarchy';
import Notification from '../layouts/dashboard/header/Notification';
import Location from '../pages/location';
import Card from '../pages/greetingCard/Card';
import Opd from '../pages/opd/Opd';
import BirthdayCard from '../pages/greetingCard/birthdayCard/BirthdayCard';
import DoctordayCard from '../pages/greetingCard/doctorday card/DoctordayCard';
import NewYearCard from '../pages/greetingCard/NewYearCard/NewYearCard';
import AnniversaryCard from '../pages/greetingCard/AnniversaryCard/AnniversaryCard';
// import Product from '../pages/product';
import { Sells } from '../pages/Sells';
import BirthdayCards from '../pages/greetingCard/birthdayCard/Catd';
import { Chemist } from '../pages/chemist';
import { ChemistView } from '../pages/chemist/view';
import DoctorVisit from '../pages/visit/doctorVisit';
import FirmVisit from '../pages/visit/firmVisit';
import Administrator from '../pages/people/administrator';
import Doctor from '../pages/people/doctor';
import AddDoctor from '../pages/people/doctor/Add';
import EditDoctor from '../pages/people/doctor/Edit';
import Holiday from '../pages/calender'
import ActivityType from '../pages/settings/ActivityType'
import BackDateVisit from '../pages/settings/BackDateVisit'
import CallObjective from '../pages/settings/CallObjective'
import Campaingn from '../pages/settings/Campaingn'
import WorkAgenda from '../pages/settings/WorkAgenda';
import Type from '../pages/settings/Type';
import TestTypology from '../pages/settings/TestTypology';
import TaxMaster from '../pages/settings/TaxMaster';
import SkippedReason from '../pages/settings/SkippedReason';
import LeaveReason from '../pages/settings/LeaveReason';
import Designations from '../pages/settings/Designations';
import ConutryMaster from '../pages/settings/dataSetting/dataManagement/countryMaster';
// import Card from './pages/card/CardTemplate'
// import AddCard from './pages/card/Add'
// import GreetingCardView from './pages/card/View'
import Zone from '../pages/settings/Zone'
import DoctorCategory from '../pages/settings/DoctorCategory'
import Division from '../pages/settings/Division';
import DoctorSpeciality from '../pages/settings/DoctorSpeciality';
import RelationMaster from '../pages/settings/RelationMaster';
import OtherReason from '../pages/settings/OtherReason';
import FirmCategory from '../pages/settings/FirmCategory'
import HospitalCategory from '../pages/settings/HospitalCategory';
import HospitalClass from '../pages/settings/HospitalClass'
import HospitalSpeciality from '../pages/settings/HospitalSpeciality'
import Qualification from '../pages/settings/Qualification'
import InchargeType from '../pages/settings/InchargeType'
import FirmType from '../pages/settings/FirmType'
import ProductIndication from '../pages/settings/ProductIndication'
import SchemeMaster from '../pages/settings/SchemeMaster'
import Product from '../pages/settings/Products'
import ProductGroup from '../pages/settings/ProductGroup'
import ModeOfTravel from '../pages/settings/ModeOfTravel';
import ProductSample from '../pages/settings/ProductSamplesDetails'
import SampleCollectionCenter from '../pages/settings/SampleCollectionCenter'
// ----------------------------------------------------------------------

export default function Router() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role.toLowerCase();

  const routes = useRoutes([
    {
      path: `/${userRole}/dashboard`,
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={`/${userRole}/dashboard/app`} />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <User /> },
        { path: 'user/view/:id', element: <UserView /> },
        { path: 'lead', element: <Lead /> },
        { path: 'lead/view/:id', element: <LeadView /> },
        { path: 'contact', element: <Contact /> },
        { path: 'contact/view/:id', element: <ContactView /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'document', element: <Document /> },
        { path: 'event/:id', element: <Event /> },
        { path: 'call', element: <Calls /> },
        { path: 'call/view/:id', element: <CallsView /> },
        { path: 'meeting', element: <Meeting /> },
        { path: 'meeting/view/:id', element: <MeetingView /> },
        { path: 'email', element: <Email /> },
        { path: 'email/view/:id', element: <EmailView /> },
        { path: 'task', element: <Task /> },
        { path: 'task/view/:id', element: <TaskView /> },
        { path: 'emailtemplate/add', element: <AddEmailTemplate /> },
        { path: 'emailtemplate/view/:id', element: <ViewEmailTemplate /> },
        { path: 'hierarchy/:id', element: <Hierarchy /> },
        { path: 'notification', element: <Notification /> },
        { path: 'location', element: <Location /> },
        { path: 'opdcapmreport', element: <Opd /> },
        { path: 'greetingcard', element: <Card /> },
        { path: 'greetingcard/birthdaycard', element: <BirthdayCard /> },
        { path: 'greetingcard/doctordaycard', element: <DoctordayCard /> },
        { path: 'greetingcard/newyearcard', element: <NewYearCard /> },
        { path: 'greetingcard/anniversarycard', element: <AnniversaryCard /> },
        // { path: 'products', element: <Product /> },
        { path: 'sells', element: <Sells /> },
        { path: 'greetingcard/birthdaycard/card/:id', element: <BirthdayCards /> },
        { path: 'chemist', element: <Chemist /> },
        { path: 'chemist/:id', element: <ChemistView /> },
        { path: 'visits/doctorvisit', element: <DoctorVisit /> },
        { path: 'visits/firmvisit', element: <FirmVisit /> },
        { path: 'people/administrator', element: <Administrator /> },
        { path: 'people/doctor', element: <Doctor /> },
        { path: 'people/doctor/add', element: <AddDoctor /> },
        { path: 'people/doctor/update_doctor', element: <EditDoctor /> },
        { path: 'calendar/holiday&work', element: <Holiday /> },
        { path: 'setting/manageActivityType', element: <ActivityType /> },
        { path: 'setting/backDateVisit', element: <BackDateVisit /> },
        { path: 'setting/callObjective', element: <CallObjective /> },
        { path: 'setting/campaingn', element: <Campaingn /> },
        { path: 'setting/workAgenda', element: <WorkAgenda /> },
        { path: 'setting/type', element: <Type /> },
        { path: 'setting/testTypology', element: <TestTypology /> },
        { path: 'setting/taxmaster', element: <TaxMaster /> },
        { path: 'setting/skippedReason', element: <SkippedReason /> },
        { path: 'setting/leaveReason', element: <LeaveReason /> },
        { path: 'setting/skippedreason', element: <SkippedReason /> },
        { path: 'setting/leavereason', element: <LeaveReason /> },
        { path: 'setting/designations', element: <Designations /> },
        { path: 'setting/zone', element: <Zone /> },
        { path: 'setting/doctorCategory', element: <DoctorCategory /> },
        { path: 'setting/division', element: <Division /> },
        { path: 'setting/doctorSpeciality', element: <DoctorSpeciality /> },
        { path: 'setting/relationMaster', element: <RelationMaster /> },
        { path: 'setting/otherReason', element: <OtherReason /> },
        { path: 'setting/firmCategory', element: <FirmCategory /> },
        { path: 'setting/hospitalCategory', element: <HospitalCategory /> },
        { path: 'setting/hospitalClass', element: <HospitalClass /> },
        { path: 'setting/hospitalSpeciality', element: <HospitalSpeciality /> },
        { path: 'setting/qualification', element: <Qualification /> },
        { path: 'setting/inchargeType', element: <InchargeType /> },
        { path: 'setting/firmType', element: <FirmType /> },
        { path: 'setting/productIndication', element: <ProductIndication /> },
        { path: 'setting/schemeMaster', element: <SchemeMaster /> },
        { path: 'setting/product', element: <Product /> },
        { path: 'setting/productGroup', element: <ProductGroup /> },
        { path: 'setting/modeOfTravel', element: <ModeOfTravel /> },
        { path: 'setting/productSampleDetails', element: <ProductSample /> },
        { path: 'setting/SampleCollectionCenter', element: <SampleCollectionCenter /> },
        { path: 'setting/dataSetting/dataManagement', element: <ConutryMaster /> },

      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        {
          path: '*',
          element: <Navigate to={`/${userRole}/dashboard/app`} />,
          index: true,
        },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
