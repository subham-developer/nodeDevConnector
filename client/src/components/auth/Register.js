import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

function Register({ setAlert, register }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Password do not match', 'danger');
        } else {
            // register()
            register({ name, email, password });
            console.log(formData);
            // const newUser = {
            //     name,
            //     email,
            //     password
            // }
            // try {
            //     const config = {
            //         headers: {
            //             "Content-Type": "application/json",
            //             "Access-Control-Allow-Origin": "*"
            //         }
            //     };
            //     const body = JSON.stringify(newUser);
            //     console.log(body)
            //     const res = await axios.post('http://localhost:5000/api/users/', body, config);
            //     console.log(res.data)
            // } catch (err) {
            //     console.log(err.response);
            // }
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)} action="">
                <div className="form-group">
                    <input type="text" placeholder="Name" onChange={e => onChange(e)} name="name" value={name} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" onChange={e => onChange(e)} value={email} name="email" />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        onChange={e => onChange(e)}
                        placeholder="Password"
                        name="password"
                        value={password}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={e => onChange(e)}
                        name="password2"
                        value={password2}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    );
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register);
{/* Connect takes two parameters 
1) MapStateToProps=======Which is null in this case. 
Mapstatetoprops is basically to get current state of a project.
2) It's parameter======which is Action. In this case setAlert & register is a action needs to be called. */}