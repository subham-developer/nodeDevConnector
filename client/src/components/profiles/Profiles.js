import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Spinner from '../layout/Spinner';
import { getALlProfile } from '../../actions/profile';
import ProfileItem from './ProfileItem'

const Profiles = ({ getALlProfile, loading, profiles }) => {
    useEffect(() => {
        getALlProfile();
    },[getALlProfile]);
    // console.log(profile);
    // console.log(profiles);
    return (
        <Fragment>
            { loading ? <Spinner></Spinner> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse And Connect With Developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (profiles.map((profile, index)=>{
                        // console.log(profile)
                        return (
                            <ProfileItem key={index} profile={profile}/>
                        )
                    }
                    )
                    ): <h4>No profle found</h4>}
                </div>
            </Fragment> }
        </Fragment>
    )
}
Profiles.propTypes = {
    getALlProfile: PropTypes.func.isRequired,
    profiles: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profiles: state.profile.profiles,
    loading: state.profile.loading
});

export default connect(mapStateToProps, { getALlProfile })(Profiles);

