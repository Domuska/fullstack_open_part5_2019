import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className='title-div'>
      {blog.title} {blog.author}
    </div>
    <div className='likes-div'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
);

export default SimpleBlog;