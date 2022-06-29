import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import app from '../../firebase';
import { getAuth } from 'firebase/auth';

export class LockScreen extends Component {
  state = {
    email: null,
    error: null
  }
  render() {
    return (
      <div>
        <div className="content-wrapper d-flex align-items-center auth lock-full-bg h-100">
          <div className="row w-100 align-items-center">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-transparent text-left p-5 text-center">
                <img style={{
                  height: '80px',
                  width: '80px',
                  borderRadius: '40px'
                }} src={this.props.user && this.props.user.image ? this.props.user.image : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg'} alt="profile" />
                <form className="pt-5">
                  <div className="form-group">
                    <label>ReEnter Email to unlock</label>
                    <input onChange={(e) => this.setState({ email: e.target.value })}
                      type="email" className="form-control text-center" id="examplePassword1" placeholder="Email" />
                  </div>
                  <p style={{ color: 'red' }}>{this.state.error}</p>
                </form>
                <div className="mt-5">
                  <button onClick={() => {
                    const auth = getAuth(app);
                    if (this.state.email == auth.currentUser.email) {
                      window.location.href = '/dashboard'
                    } else {
                      this.setState({ error: 'Wrong Email!' })
                    }
                  }} className="btn btn-block btn-success btn-lg font-weight-medium">UNLOCK</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({ user: state.user })
export default connect(mapStateToProps)(LockScreen)
