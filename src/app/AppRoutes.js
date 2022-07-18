import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import app from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { postData, url, setUser,setUserInfo,
  setHotels,setDeals,setBookAppointment,
  setAddresses,setMembership,setPoster, setBanner } from '../action';
import { connect } from 'react-redux';
import { setHotelBooking, setBrands } from './../action';



const Dashboard = lazy(() => import('./dashboard/Dashboard'));



const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));


const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));



const Mdi = lazy(() => import('./icons/Mdi'));


const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));
const Lockscreen = lazy(() => import('./user-pages/Lockscreen'));

const BlankPage = lazy(() => import('./general-pages/BlankPage'));

const AddSlider = lazy(() => import('./sliders/Add'))
const DeleteSlider = lazy(() => import('./sliders/Delete'))
const UpdateSlider = lazy(() => import('./sliders/Update'))

const AddHotel = lazy(() => import('./hotels/Add'))
const DeleteHotel = lazy(() => import('./hotels/Delete'))
const UpdateHotel = lazy(() => import('./hotels/Update'))

const AddDeal = lazy(() => import('./deals/Add'))
const DeleteDeal = lazy(() => import('./deals/Delete'))
const UpdateDeal = lazy(() => import('./deals/Update'))

const AddMembership = lazy(() => import('./membership/Add'))
const DeleteMembership = lazy(() => import('./membership/Delete'))
const UpdateMembership = lazy(() => import('./membership/Update'))

const Orders = lazy(() => import('./customer/Order'))
const AllMember= lazy(() => import('./member/AllMember'))

const AddBrands = lazy(() => import('./brands/Add'))
const UpdateBrands = lazy(() => import('./brands/Update'))
const DeleteBrands = lazy(() => import('./brands/Delete.js'))

const HotelImage = lazy(() => import('./hotels/HotelImage'))
const Poster= lazy(() => import('./member/Poster.js'))
const Banner = lazy(() => import('./member/Banner.js'))
const Destination = lazy(() => import('./member/Destination.js'))
const PromoCode=lazy(()=> import('./customer/PromoCode.js'))
const CouponCode = lazy(() => import('./customer/CouponCode.js'))
const Messages = lazy(() => import('./customer/Messages.js'))
const Enquiry = lazy(() => import('./customer/Enquiry.js'))
const PopularRestaurant = lazy(() => import('./customer/PopularRestaurant.js'))
const Business = lazy(() => import('./customer/Business.js'));
const MemberAction = lazy(() => import('./member/MemberAction.js'))
const Flash = lazy(() => import('./customer/Flash.js'))
const TopBrands=lazy(() => import('./brands/TopBrands.js'))
const Outlets = lazy(() => import('./brands/Outlets.js'))
const Notification = lazy(() => import('./customer/Notificaltion.js'))
const Offer= lazy(() => import('./member/Offer.js'))
const Offer2 = lazy(() => import('./member/Offer2.js'))
const AddMember = lazy(() =>import('./member/AddMember.js'))


class AppRoutes extends Component {
  
  constructor(props) {
    super(props)
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        postData(url + '/getData', {
          tableName: 'user',
          condition: 'uid=' + "'" + user.uid + "'",
        }).then(data => {
          if(Array.isArray(data)){
           if(data[0].admin==1){
            
            return this.props.setUser(data[0]);
           }
           return console.log('Different account')
          }
          console.log(data.message);
        })
      } else {
        //this.props.setUser('no user')
      }
      
    });
   
  }

  componentDidMount() {
    postData(url+'/getData', {
      tableName: 'user',
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setUserInfo(data)
      }
      console.log(data.message);
    })
    postData(url+'/getData',{
      tableName:'hotels',
      orderColumn:'date',
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setHotels(data)
      }
      console.log(data.message)
    })
    postData(url+'/getData', {
      tableName: 'deals',
      orderColumn:'date'
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setDeals(data)
      }
      console.log(data.message)
    })
    postData(url+'/getData', {
      tableName: 'hotel_booking',
      orderColumn:'date'
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setHotelBooking(data)
      }
      console.log(data.message)
    })
    postData(url+'/getData', {
      tableName: 'book_appointment',
      orderColumn:'date'
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setBookAppointment(data)
      }
      console.log(data.message)
    })
    postData(url+'/getData', {
      tableName: 'brands',
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setBrands(data)
      }
      console.log(data.message)
    })
    postData(url+'/getData', {
      tableName: 'addresses',
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setAddresses(data)
      }
      console.log(data.message)
    })
    postData(url+'/getData', {
      tableName: 'membership',
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setMembership(data)
      }
      console.log(data.message)
    })
    postData(url+'/getData', {
      tableName: 'poster',
      orderColumn:'date'
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setPoster(data)
      }
    })
    postData(url+'/getData', {
      tableName: 'banner',
      orderColumn:'date'
    }).then(data => {
      if(Array.isArray(data)){
        return this.props.setBanner(data)
      }
    })
  }
  render () {
    //console.log(this.props.user)
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/">
          <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/flash" component={ Flash } />
          <Route path="/posters/add" component={ AddSlider } />
          <Route path="/posters/delete" component={DeleteSlider } />
          <Route path="/posters/update" component={ UpdateSlider } />
          <Route path="/member/AllMember" component={ AllMember } />
          <Route path="/member/add" component={ AddMember } />
          <Route path="/hotels/add" component={ AddHotel } />
          <Route path="/hotels/delete" component={ DeleteHotel } />
          <Route path="/hotels/update/:id" component={ UpdateHotel } />
          <Route path="/hotels/image" component={ HotelImage } />
          <Route path="/posters/banner" component={ Banner } />
          <Route path="/posters/poster" component={ Poster } />
          <Route path="/posters/destination" component={ Destination } />
          <Route path="/posters/offer" component={Offer}/>
          <Route path="/posters/new" component={Offer2}/>

          <Route path="/deals/add" component={AddDeal}/>
          <Route path="/deals/delete" component={DeleteDeal}/>
          <Route path="/deals/update/:id" component={UpdateDeal}/>
          <Route path="/member_action/:uid" component={MemberAction}/>
          <Route path="/send_message" component={Notification}/>

          <Route path="/membership/add" component={AddMembership}/>
          <Route path="/membership/delete" component={DeleteMembership}/>
          <Route path="/membership/update" component={UpdateMembership}/>

          <Route path="/brands/add" component={AddBrands}/>
          <Route path="/brands/update/:id" component={UpdateBrands}/>
          <Route path="/brands/delete" component={DeleteBrands}/>
          <Route path="/brands/top" component={TopBrands}/>
          <Route path="/brands/outlets" component={Outlets}/>
          <Route path="/customer/order" component={Orders}/>
          
          <Route path="/icons/mdi" component={ Mdi } />


          <Route path="/charts/chart-js" component={ ChartJs } />
          <Route path="/discount/coupon" component={ CouponCode } />
          <Route path="/discount/promo" component={ PromoCode } />
          <Route path="/messages" component={ Messages } />
          <Route path="/business" component={Business}/>
          <Route path="/enquiry" component={ Enquiry } />
          <Route path="/posters/restaurants" component={ PopularRestaurant } />


          <Route path="/user-pages/login-1" component={ Login } />
          <Route path="/user-pages/register-1" component={ Register1 } />
          <Route path="/user-pages/lockscreen" component={ Lockscreen } />

          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } />

          <Route path="/general-pages/blank-page" component={ BlankPage } />
        </Switch>
      </Suspense>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: user => dispatch(setUser(user)),
    setUserInfo: userInfo => dispatch(setUserInfo(userInfo)),
    setHotels: userInfo => dispatch(setHotels(userInfo)),
    setDeals: userInfo => dispatch(setDeals(userInfo)),
    setHotelBooking: userInfo => dispatch(setHotelBooking(userInfo)),
    setBookAppointment: userInfo => dispatch(setBookAppointment(userInfo)),
    setBrands: userInfo => dispatch(setBrands(userInfo)),
    setAddresses: userInfo => dispatch(setAddresses(userInfo)),
    setMembership: userInfo => dispatch(setMembership(userInfo)),
    setPoster: poster => dispatch(setPoster(poster)),
    setBanner: banner => dispatch(setBanner(banner)),
  }
}
const mapStateToProps = state => ({ user: state.user })
export default connect(mapStateToProps,mapDispatchToProps) (AppRoutes);