import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({experience: {
    company, title, location, from, to, description
}}) => {
  return(
        <Fragment>
            <div>
            <h3 className="text-dark">{ company && <span>{ company }</span>}</h3>
            <p><Moment format='YYYY/MM/DD'></Moment> - {!to ? 'Now': <Moment format='YYYY/MM/DD'>{ to }</Moment>}</p>
            <p><strong>Position: </strong>{ title }</p>
            <p>
              <strong>Description: </strong>{ description }
            </p>
          </div>
        </Fragment>
  );
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
