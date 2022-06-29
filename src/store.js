import { createStore } from "redux";
import { combineReducers } from "redux"
import user from './reducers/user';
import userInfo from './reducers/userInfo';
import hotels from './reducers/hotels';
import deals from './reducers/deals';
import hotelBooking from './reducers/hotelBooking';
import bookAppointment from './reducers/book_appointment';
import brands from './reducers/brands';
import addresses from "./reducers/addresses";
import membership from './reducers/membership';
import poster from './reducers/poster';
import banner from './reducers/banner';

const all=combineReducers({
   user:user,
   userInfo:userInfo,
   hotels:hotels,
   deals:deals,
   hotelBooking:hotelBooking,
   bookAppointment:bookAppointment,
   brands:brands,
   addresses:addresses,
   membership:membership,
   poster:poster,
   banner:banner,
})

const store=createStore(all);
export default store