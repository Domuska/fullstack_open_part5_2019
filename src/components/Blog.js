import React from 'react';


const Blog = ({ blog }) => (
  <div>
    &quot;{blog.title}&quot; by {blog.author}
  </div>
);

export default Blog;