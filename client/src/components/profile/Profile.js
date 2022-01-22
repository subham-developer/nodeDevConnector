import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({getProfileById, profiles, profile, loading, auth, match}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    },[getProfileById, match.params.id]);
    console.log(match.params.id)
    // console.log(profile)
    return (
        <Fragment>
            { profile === null || loading ? (
                <Spinner/>
            ): <Fragment> 
                <Link to="/profiles" className="btn btn-primary">Back To Profiles</Link> 
                { auth.isAuthenticated && auth.loading === false && 
                auth.user._id === profile.user._id && (
                    <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link> 
                )}
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    {/* <!-- Experience --> */}
                    <div class="profile-exp bg-white p-2">
                        <h2 class="text-primary">Experience</h2>
                        { profile.experience.length > 0 ? (
                            <Fragment>
                                { profile.experience.map((experience, index) => (
                                    <ProfileExperience key={experience._id} experience={experience} />
                                )) }
                            </Fragment>
                        ): (<h4> No Experience Credentials </h4>) }
                    </div>
                    <div class="profile-edu bg-white p-2">
                        <h2 class="text-primary">Education</h2>
                        { profile.education.length > 0 ? (
                            <Fragment>
                                { profile.education.map((education, index) => (
                                    <ProfileEducation key={education._id} education={education} />
                                )) }
                            </Fragment>
                        ): (<h4> No Education Credentials </h4>) }
                    </div>
                    { profile.githubusername && ( 
                        <ProfileGithub username={ profile.githubusername } /> 
                    )}
                </div>
        </Fragment>
                }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profiles: PropTypes.object.isRequired,
    // auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profiles: state.profile.profiles,
    profile: state.profile.profile,
    loading: state.profile.loading,
    auth: state.auth,
});

export default connect(mapStateToProps,{ getProfileById })(Profile)
