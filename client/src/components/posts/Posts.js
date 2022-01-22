import React, { Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getAllPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getAllPosts();
    },[getAllPosts]);
    // console.log(post)
  return ( loading ? ( <Spinner/> ) : (
        <Fragment>
            <Link to="/profiles" classNameName="btn">Back To Profiles</Link> 
            <h1 className="large text-primary">
        Posts
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
      <PostForm />
      { posts.length > 0 ? (posts.map((post, index)=>{
          return (
            <PostItem key={index} post={post}/>
        )
      })): <h4>No post found</h4>}
         </Fragment>)
  );
};

Posts.propTypes = {
    getAllPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getAllPosts } )(Posts);
