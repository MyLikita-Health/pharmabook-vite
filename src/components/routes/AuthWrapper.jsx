import React from 'react'
// import { connect } from 'react-redux';
import Navbar from '../Navbars/MainNavbar'

function AuthWrapper(props) {
  return (
    <div className="" style={{ height: '100vh' }}>
      <Navbar />
      <div style={{ height: 50 }} />

      <main>{props.children}</main>
    </div>
  )
}

// function mapStateToProps({ auth }) {
//   return { authenticated: auth.authenticated };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     loadUser: (err, cb) => dispatch(loadUser(err, cb)),
//     getFacilityInfo: () => dispatch(getFacilityInfo()),
//   };
// }

export default AuthWrapper
