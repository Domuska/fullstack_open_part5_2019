import React from 'react';

import Blog from './Blog';

// NOT USED ANY MORE. LEFT FOR REFERENCE

const Blogs = ({ blogs, onBlogLike, onBlogDelete }) => {

  const getBlogRows = () => {
    return blogs.map(blog =>
      <Blog
        blog={blog}
        key={blog.id}
        onBlogLike={onBlogLike}
        onBlogDelete={onBlogDelete}/>
    );
  };

  return (
    <>
      <h2> Blogs </h2>
      <ul>
        {getBlogRows()}
      </ul>
    </>
  );
};

export default Blogs;