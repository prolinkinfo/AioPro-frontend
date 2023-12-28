import { configureStore } from '@reduxjs/toolkit';
import GetCityReducer from '../slice/GetCitySlice';
import GetStateReducer from '../slice/GetStateSlice'
import GetDivisionReducer from '../slice/GetDivisionSlice'
import GetCountryReducer from '../slice/getCountrySlice'
import GetDoctorSpecialityReducer from '../slice/GetDoctorSpecialitySlice';
import GetZoneReducer from '../slice/GetZoneSlice'
import GetQualificationReducer from '../slice/GetQualificationSlice';
import GetTypeReducer from '../slice/GetTypeSlice';
import GetDoctorCategoryReducer from '../slice/GetDoctorCategorySlice';
import GetEmployeeReducer from '../slice/GetEmployeeSlice'
import GetDoctorReducer from '../slice/GetDoctorSlice';
import GetDoctorVisitReducer from '../slice/GetDoctorVisitSlice';
import GetFirmTypeReducer from '../slice/GetFirmTypesSlice'
import GetFirmReducer from '../slice/GetFirmSlice'
import GetFirmVisitReducer from '../slice/GetFirmVisitSlice';
import GetTargetReducer from '../slice/GetTargetSlice';
import GetLeaveEntitlementReducer from '../slice/GetLeaveEntitlementSlice';
import GetProductReducer from '../slice/GetProductSlice';
import GetPresentationReducer from '../slice/GetPresentationSlice';
import GetExpenseHeadReducer from '../slice/GetExpenseHeadSlice';
import GetActivityTypeReducer from '../slice/GetActivityTypeSlice';
import GetBackDateVisitReducer from '../slice/GetBackDateVisitSlice';
import GetCallObjectiveReducer from '../slice/GetCallObjectiveSlice';
import GetFirmCategoryReducer from '../slice/GetFirmCategorySlice';
import GetHospitalCategoryReducer from '../slice/GetHospitalCategorySlice';
import GetHospitalClassReducer from '../slice/GetHospitalClassSlice';
import GetHospitalSpecialityReducer from '../slice/GetHospitalSpecialitySlice';
import GetInchargeTypeReducer from '../slice/GetInchargeTypeSlice';
import GetLeaveReasonReducer from '../slice/GetLeaveReasonSlice';
import GetModeOfTravelReducer from '../slice/GetModeOfTravelSlice';
import GetOtherReasonReducer from '../slice/GetOtherReasonSlice';
import GetProductGroupReduce from '../slice/GetProductGroupSlice';
import GetTaxMasterReducer from '../slice/GetTaxMasterSlice';
import GetProductIndicationReducer from '../slice/GetProductIndicationSlice';
import GetProductSampleDetailsReducer from '../slice/GetProductSampleDetailsSlice';
import GetPromotionalGiftReducer from '../slice/GetPromotionalGiftSlice';
import GetRelationMasterReducer from '../slice/GetRelationMasterSlice';
import GetSampleCollectionCenterReducer from '../slice/GetSampleCollectionCenterSlice';
import GetSchemeMasterReducer from '../slice/GetSchemeMasterSlice';
import GetSkippedReasonReducer from '../slice/GetSkippedReasonSlice';
import GetTestTypologyReducer from '../slice/GetTestTypologySlice';
import GetVisitCounterReducer from '../slice/GetVisitCounterSlice';
import GetWorkAgendaSlice from '../slice/GetWorkAgendaSlice'
import GetMediaGalleryReducer from '../slice/GetMediaGallerySlice';

const store = configureStore({
  reducer: {
    getCity: GetCityReducer,
    getState: GetStateReducer,
    getDivision: GetDivisionReducer,
    getCountry: GetCountryReducer,
    getDoctorSpeciality: GetDoctorSpecialityReducer,
    getZone: GetZoneReducer,
    getQualification: GetQualificationReducer,
    getType: GetTypeReducer,
    getDoctorCategory: GetDoctorCategoryReducer,
    getEmployee: GetEmployeeReducer,
    getDoctor: GetDoctorReducer,
    getDoctorVisit: GetDoctorVisitReducer,
    geFirmType: GetFirmTypeReducer,
    getFirm: GetFirmReducer,
    getFirmVisit: GetFirmVisitReducer,
    getTarget: GetTargetReducer,
    getLeaveEntitlement: GetLeaveEntitlementReducer,
    getProduct: GetProductReducer,
    getPresentation: GetPresentationReducer,
    getExpenseHead: GetExpenseHeadReducer,
    getActivityType: GetActivityTypeReducer,
    getBackDateVisit: GetBackDateVisitReducer,
    getCallObjective: GetCallObjectiveReducer,
    getFirmCategory: GetFirmCategoryReducer,
    getHospitalCategory: GetHospitalCategoryReducer,
    getHospitalClass: GetHospitalClassReducer,
    getHospitalSpeciality: GetHospitalSpecialityReducer,
    getInchargeType: GetInchargeTypeReducer,
    getLeaveReason: GetLeaveReasonReducer,
    getModeOfTravel: GetModeOfTravelReducer,
    getOtherReason: GetOtherReasonReducer,
    getProductGroup: GetProductGroupReduce,
    getTaxMaster: GetTaxMasterReducer,
    getProductIndication: GetProductIndicationReducer,
    getProductSampleDetails: GetProductSampleDetailsReducer,
    getPromotionalGift: GetPromotionalGiftReducer,
    getRelationMaster: GetRelationMasterReducer,
    getSampleCollectionCenter: GetSampleCollectionCenterReducer,
    getSchemeMaster: GetSchemeMasterReducer,
    getSkippedReason: GetSkippedReasonReducer,
    getTestTypology: GetTestTypologyReducer,
    getVisitCounter: GetVisitCounterReducer,
    getWorkAgenda: GetWorkAgendaSlice,
    getMediaGallery: GetMediaGalleryReducer,
  },
});

export default store;