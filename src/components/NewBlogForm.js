/**
 * Component for handling the new blog form
 * Will call onSubmitFormHandler when
 * submit button is pushed
 */

import React from 'react';
import { useField } from '../hooks';

const NewBlogForm = ({ onSubmitFormHandler }) => {

  const titleHook = useField(`text`, `Title`);
  const authorHook = useField(`text`, `Author`);
  const urlHook = useField(`text`, `Url`);

  const handle = (event) => {
    event.preventDefault();
    onSubmitFormHandler({ title: titleHook.value, author: authorHook.value, url: urlHook.value });
  };

  return (
    <form>
      title:
      <input {...titleHook.input}/>
      <br></br>

      author
      <input {...authorHook.input}/>
      <br></br>

      url
      <input {...urlHook.input}/>
      <br></br>
      <button type="submit" onClick={handle}>Submit</button>
    </form>
  );
};

export default NewBlogForm;