import React, {useEffect, Fragment, useState} from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';


const AddEducation = ({
    profile: { profile, loading },
    // createProfile,
    getCurrentProfile,
    addEducation,
    history
}) => {

    const[formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        addEducation(formData, history);
      };

    // useEffect(
    //     () => {
    //         // getCurrentProfile();
    //         setFormData({
    //             school: loading || !profile.experience.school ? '' : profile.experience.school,
    //             degree: loading || !profile.experience.degree ? '' : profile.experience.degree,
    //             fieldofstudy: loading || !profile.experience.fieldofstudy ? '' : profile.experience.fieldofstudy,
    //             from: loading || !profile.experience.from ? '' : profile.experience.from,
    //             to: loading || !profile.experience.to ? '' : profile.experience.to,
    //             current: loading || !profile.experience.current ? '' : profile.experience.current,
    //             description: loading || !profile.experience.description ? '' : profile.experience.description,
    //         });
    //     },[]);

    return (
        <Fragment>
            <h1 class="large text-primary">
            Add Your Education
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={onSubmit}>
                <div class="form-group">
                <input type="text" placeholder="* School Name" name="school" value={school} onChange={e => onChange(e)} required />
                </div>
                <div class="form-group">
                <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={e => onChange(e)}  required />
                </div>
                <div class="form-group">
                <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)}  />
                </div>
                <div class="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)}  />
                </div>
                <div class="form-group">
                <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {setFormData({...formData, current: !current });
                toggleDisabled(!toDateDisabled);
            }} />{''} Current Job</p>
                </div>
                <div class="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled': ''} />
                </div>
                <div class="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={description}
                    onChange={e => onChange(e)}
                ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
  });

export default connect(mapStateToProps, {addEducation})(AddEducation);

