import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addLikes, removeLikes, deletePost } from '../../actions/post';

function PostItem({addLikes, removeLikes, deletePost, showActions, post: { user, _id, name, text, avatar, likes, comments, date }, auth }) {
  return (
      <Fragment>
        <div key={_id} className="posts">
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={ avatar }
                        alt=""
                    />
                    <h4>{ name }</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                    { text }
                    </p>
                    <p className="post-date">
                        <Moment format='YYYY/MM/DD'>{ date }</Moment>
                    </p>
                    { showActions && (
                        <Fragment>
                            <button onClick={e => { addLikes(_id) }} type="button" className="btn btn-light">
                            <i className="fas fa-thumbs-up"></i>{'  '}
                            { likes.length > 0 && (
                                <span>{ likes.length }</span>
                            ) }
                            </button>
                            <button onClick={e => { removeLikes(_id) }} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${_id}`} className="btn btn-primary">
                                Discussion {' '} { comments.length > 0 && (
                                    <span className='comment-count'>{ comments.length }</span>
                                ) }
                                
                            </Link>
                            { !auth.loading && user === auth.user._id && (
                                <button onClick={e => { deletePost(_id) }} type="button" className="btn btn-danger">
                                    <i className="fas fa-times"></i>
                                </button>
                            )}
                        </Fragment>
                    )}
                    
                    
                </div>
            </div>
        </div>
      </Fragment>
  );
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLikes: PropTypes.func.isRequired,
    removeLikes: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addLikes, removeLikes, deletePost} )(PostItem);
