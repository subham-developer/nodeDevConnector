import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, deleteComment } from '../../actions/post';
import CommentItem from './CommentItem';

function CommentForm({ postId, addComment }) {
    const [text, setText ] = useState('')
  return (<Fragment>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={ e => {
            e.preventDefault();
            addComment(postId, {text});
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            required
            onChange={ e => {setText(e.target.value)}}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
  </Fragment>);
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

// const mapStateToPRops = (state) => ({

// })

export default connect(null, { addComment, deleteComment })(CommentForm);
