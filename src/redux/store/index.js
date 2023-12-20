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
  },
});

export default store;