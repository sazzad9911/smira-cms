import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';

class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/sliders', state: 'sliderOpen' },
      { path: '/hotels', state: 'hotelOpen' },
      { path: '/deals', state: 'dealOpen' },
      { path: '/membership', state: 'membershipOpen' },
      { path: '/customer', state: 'customerOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/advanced-ui', state: 'advancedUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/maps', state: 'mapsMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
      { path: '/general-pages', state: 'generalPagesMenuOpen' },
      { path: '/ecommerce', state: 'ecommercePagesMenuOpen' },
      { path:'/brands', state:'brandsOpen'},
      { path:'/poster', state:'poster'},
      {path:'/destination',state:'destination'},
      {path:'/coupon', state:'coupon'},
      { path:'/promo', state:'promo'},
      { path:'/restaurants', state:'restaurants'},
      { path:'/messages',state:'messages'},
      { path:'/AllMember', state:'AllMember'},
      { path:'/discount', state:'discount'},
      { path:'/posters', state:'posters'},
      { path:'/flash', state:'flash'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true })
      }
    }));

  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="!#" className="nav-link" onClick={evt => evt.preventDefault()}>
              <div className="nav-profile-image">
                <img src={this.props.user&&this.props.user.image?this.props.user.image:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg'} alt="profile" />
                <span className="login-status online"></span> {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2">{this.props.user?this.props.user.name:'Loading..'}</span>
                <span className="text-secondary text-small">{this.props.user?this.props.user.email:'Loading..'}</span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">Dashboard</span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/AllMember') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/AllMember">
              <span className="menu-title">Member List</span>
              <i className="mdi mdi-account menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/customer') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/customer/order">
              <span className="menu-title">Booking List</span>
              <i className="mdi mdi-weight menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/enquiry') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/enquiry">
              <span className="menu-title">Booking Enquiry</span>
              <i className="mdi mdi-help-circle menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/business') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/business">
              <span className="menu-title">Business With Us</span>
              <i className="mdi mdi-briefcase menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/messages') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/messages">
              <span className="menu-title">Talk to Us Enquiry</span>
              <i className="mdi mdi-comment-text menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/flash') ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to="/flash">
              <span className="menu-title">Flash Popup</span>
              <i className="mdi mdi-book-open menu-icon"></i>
            </Link>
          </li>
          <li className={this.isPathActive('/discount') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.discount ? 'nav-link menu-expanded' : 'nav-link'} onClick={() =>
              this.toggleMenuState('discount')} data-toggle="collapse">
              <span className="menu-title">Discounts</span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-barcode menu-icon"></i>
            </div>
            <Collapse in={this.state.discount}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={
                  this.isPathActive('/discount/coupon') ? 'nav-link active' : 'nav-link'}
                  to="/discount/coupon">Coupon Code</Link></li>
                <li className="nav-item"> <Link className={
                  this.isPathActive('/discount/promo') ? 'nav-link active' : 'nav-link'}
                  to="/discount/promo"><>Promo Code</></Link></li>
                
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/hotels') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.hotelOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() =>
              this.toggleMenuState('hotelOpen')} data-toggle="collapse">
              <span className="menu-title"><>Hotels</></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-hotel menu-icon"></i>
            </div>
            <Collapse in={this.state.hotelOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={
                  this.isPathActive('/hotels/add') ? 'nav-link active' : 'nav-link'}
                  to="/hotels/add"><>Add Hotel</></Link></li>
                <li className="nav-item"> <Link className={
                  this.isPathActive('/hotels/delete') ? 'nav-link active' : 'nav-link'}
                  to="/hotels/delete"><>Hotel List</></Link></li>
            
                {
                  /*
                  <li className="nav-item"> <Link className={
                  this.isPathActive('/hotels/update') ? 'nav-link active' : 'nav-link'}
                  to="/hotels/update"><>Update Hotel</></Link></li>
                  */
                }
                <li className="nav-item"> <Link className={
                  this.isPathActive('/hotels/image') ? 'nav-link active' : 'nav-link'}
                  to="/hotels/image"><>Add Hotel Image</></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/brands') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.brandsOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() =>
              this.toggleMenuState('brandsOpen')} data-toggle="collapse">
              <span className="menu-title"><>Brands</></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-book-multiple menu-icon"></i>
            </div>
            <Collapse in={this.state.brandsOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={
                  this.isPathActive('/brands/add') ? 'nav-link active' : 'nav-link'}
                  to="/brands/add"><>Add new brand</></Link></li>
               

                 <li className="nav-item"> <Link className={
                  this.isPathActive('/brands/delete') ? 'nav-link active' : 'nav-link'}
                  to="/brands/delete"><>Brand List</></Link></li> 
                  <li className="nav-item"> <Link className={
                  this.isPathActive('/brands/outlets') ? 'nav-link active' : 'nav-link'}
                  to="/brands/outlets"><>Outlets</></Link></li> 
                  <li className="nav-item"> <Link className={
                  this.isPathActive('/brands/top') ? 'nav-link active' : 'nav-link'}
                  to="/brands/top"><>Top Brands</></Link></li>
                {
                  /*
                   
                  <li className="nav-item"> <Link className={
                  this.isPathActive('/brands/update') ? 'nav-link active' : 'nav-link'}
                  to="/brands/update"><>Update Brand</></Link></li>
                  
                  */
                }
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/deals') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.dealOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() =>
              this.toggleMenuState('dealOpen')} data-toggle="collapse">
              <span className="menu-title"><>Deals</></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-nutrition menu-icon"></i>
            </div>
            <Collapse in={this.state.dealOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={
                  this.isPathActive('/deals/add') ? 'nav-link active' : 'nav-link'}
                  to="/deals/add"><>Add Deal</></Link></li>
                <li className="nav-item"> <Link className={
                  this.isPathActive('/deals/delete') ? 'nav-link active' : 'nav-link'}
                  to="/deals/delete"><>Deal List</></Link></li>
                 {
                  /*
                  <li className="nav-item"> <Link className={
                  this.isPathActive('/deals/update/2') ? 'nav-link active' : 'nav-link'}
                  to="/deals/update"><>Update Deal</></Link></li>
                  */
                 }
              </ul>
            </Collapse>
          </li>
          <li className={this.isPathActive('/posters') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.posters ? 'nav-link menu-expanded' : 'nav-link'} onClick={() =>
              this.toggleMenuState('posters')} data-toggle="collapse">
              <span className="menu-title"><>Posters</></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-arrange-bring-forward menu-icon"></i>
            </div>
            <Collapse in={this.state.posters}>
              <ul className="nav flex-column sub-menu">
              <li className="nav-item"> <Link className={
                  this.isPathActive('/posters/add') ? 'nav-link active' : 'nav-link'}
                  to="/posters/add">Add Slider</Link></li>
                <li className="nav-item"> <Link className={
                  this.isPathActive('/posters/delete') ? 'nav-link active' : 'nav-link'}
                  to="/posters/delete"><>Slider List</></Link></li>
                <li className="nav-item"> <Link className={
                  this.isPathActive('/posters/poster') ? 'nav-link active' : 'nav-link'}
                  to="/posters/poster"><>Popular Deals</></Link></li>
                <li className="nav-item"> <Link className={
                  this.isPathActive('/posters/banner') ? 'nav-link active' : 'nav-link'}
                  to="/posters/banner"><>Activities Near You</></Link></li>
                  <li className="nav-item"> <Link className={
                  this.isPathActive('/posters/destination') ? 'nav-link active' : 'nav-link'}
                  to="/posters/destination"><>Destination to go</></Link></li>
                  <li className="nav-item"> <Link className={
                  this.isPathActive('/posters/restaurants') ? 'nav-link active' : 'nav-link'}
                  to="/posters/restaurants"><>Popular Restaurants</></Link></li>
              </ul>
            </Collapse>
          </li>
         
           <li className={this.isPathActive('/membership') ? 'nav-item active' : 'nav-item'}>
            <div className={this.state.membershipOpen ? 'nav-link menu-expanded' : 'nav-link'} onClick={() =>
              this.toggleMenuState('membershipOpen')} data-toggle="collapse">
              <span className="menu-title"><>Membership Plans</></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-television-guide menu-icon"></i>
            </div>
            <Collapse in={this.state.membershipOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={
                  this.isPathActive('/membership/add') ? 'nav-link active' : 'nav-link'}
                  to="/membership/add"><>Update Plans</></Link></li>
               
                {
                 /*
                   <li className="nav-item"> <Link className={
                  this.isPathActive('/membership/delete') ? 'nav-link active' : 'nav-link'}
                  to="/membership/delete"><>Delete Plan</></Link></li>

                  <li className="nav-item"> <Link className={
                  this.isPathActive('/membership/update') ? 'nav-link active' : 'nav-link'}
                  to="/membership/update"><>Update Plan</></Link></li>
                  */
                }
              </ul>
            </Collapse>
          </li>
         
         
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}
const mapStateToProps=(state) =>({user: state.user});
export default connect(mapStateToProps) (withRouter(Sidebar));