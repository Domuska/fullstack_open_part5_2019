import React from 'react'

import Blog from './Blog';

const Blogs = ({blogs}) => {

  const getBlogRows = () => {
    return blogs.map(blog => 
      <Blog blog={blog} key={blog.id}/>
    )
  }

  return (
    <>
      <h2> Blogs </h2>
      <ul>
        {getBlogRows()}
      </ul>
    </>
  )
}

export default Blogs;