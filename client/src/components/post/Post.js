import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';


function Post({ getPostById, post: { post, loading }, match }) {
    useEffect(()=>{
        getPostById(match.params.id)
    }, [getPostById]);
  return (loading || post === null ? ( <Spinner/> ) : (<Fragment>
      <Link to='/posts' className="btn">Back to posts</Link>
      <PostItem post={ post } showActions={ false } />
      <CommentForm postId={ post._id } />
      <div class="comments">
          { post.comments.map((comment) => (
              <CommentItem key={ comment._id } comment={ comment } postId={ post._id } />
          )) }
          
      </div>
  </Fragment>));
}

Post.propTypes = {
    getPostById: PropTypes.func.isRequired,
};

 const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { getPostById })(Post);
