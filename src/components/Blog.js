import React, { useState } from 'react';

const Blog = ({ blog, onBlogLike, children }) => {

  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };


  const expandedStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: `solid`,
    borderWidth: 1,
    marginBottom: 2,
  };

  const titleStyle = {
    cursor: `pointer`
  };

  const buttonStyle = {
    marginLeft: 10
  };


  const expandedContent = () => (
    <>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button
          onClick={() => onBlogLike(blog)}
          style={buttonStyle}
        >like</button>
      </div>
      {children}
    </>
  );

  console.log(blog);

  return (
    <div style={expandedStyle}>
      <div>
        <p
          onClick={() => toggleExpansion()}
          style={titleStyle}>
            &quot;{blog.title}&quot; by {blog.author}
        </p>
        {expanded && expandedContent()}
      </div>
    </div>
  );
};

export default Blog;
