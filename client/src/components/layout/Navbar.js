import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

function Navbar({ auth: { isAuthenticated, loading}, logout}) {
    const authLinks = (
        <ul>
        <li>
          <Link to="/dashboard"> <i class="fas fa-tachometer-alt"></i> <span className="hide-sm">Dashboard</span> </Link>
          <Link to="/profiles"> <i class="fas fa-user"></i> <span className="hide-sm">Profiles</span> </Link>
          <Link to="/posts"> <i class="far fa-clipboard"></i> <span className="hide-sm">Posts</span> </Link>
          <Link onClick={logout} to="#!"> <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span> </Link>
        </li>
      </ul>
    );

    const guestLinks = (
        <ul>
            <li>
            <Link to="#!"> Developers </Link>
            </li>
            <li>
            <Link to="/profiles"> Profiles </Link>
            </li>
            <li>
            <Link to="/register"> Register </Link>
            </li>
            <li>
            <Link to="/login"> Login </Link>
            </li>
      </ul>
    );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"> </i> DevConnector
        </Link>
      </h1> 
      {/* If loading is FALSE & IsAuthenticated is TRUE then show AUTHLINKs else GUESTLINKS */}
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks }</Fragment>)}
    </nav>
  );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToPRops = state => ({
    auth: state.auth
});

export default connect(mapStateToPRops, {logout}) (Navbar);
