/**
 * Component for handling the new blog form
 * Will call onSubmitFormHandler when
 * submit button is pushed
 */

import React, { useState } from 'react';

const NewBlogForm = ({ onSubmitFormHandler }) => {

  const [title, setTitle] = useState(``);
  const [author, setAuthor] = useState(``);
  const [url, setUrl] = useState(``);

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handle = (event) => {
    event.preventDefault();
    onSubmitFormHandler({ title, author, url });
  };

  return (
    <form>
      title:
      <input
        value={title}
        onChange={onTitleChange}
      />
      <br></br>

      author
      <input
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <br></br>

      url
      <input
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <br></br>
      <button type="submit" onClick={handle}>Submit</button>
    </form>
  );
};

export default NewBlogForm;