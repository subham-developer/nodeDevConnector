import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

function PostComment(props) {
    const [text, setText] = useState('');
  return (<Fragment>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={e => {
            e.preventDefault();
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
            onChange={e => {
                setText(e.target.value)
            }}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
  </Fragment>);
}

PostComment.propTypes = {};

export default PostComment;
