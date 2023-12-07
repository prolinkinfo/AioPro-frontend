import { configureStore } from '@reduxjs/toolkit';
import GetCityReducer from '../slice/GetCitySlice';
import GetStateReducer from '../slice/GetStateSlice'
import GetDivisionReducer from '../slice/GetDivisionSlice'
import GetCountryReducer from '../slice/getCountrySlice'
import GetDoctorSpecialityReducer from '../slice/GetDoctorSpecialitySlice';
import GetZoneReducer from '../slice/GetZoneSlice'
import  GetQualificationReducer  from '../slice/GetQualificationSlice';
import GetTypeReducer from '../slice/GetTypeSlice';

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
  },
});

export default store;