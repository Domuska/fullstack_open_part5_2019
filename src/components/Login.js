import React from 'react';
import PropTypes from 'prop-types';

import { useField } from '../hooks';

const Login = ({ onLoginClick }) => {

  const usernameHook = useField(`text`, `Username`);
  const passwordHook = useField(`password`, `Password`);

  const handleLogin = async (event) => {
    event.preventDefault();
    onLoginClick(usernameHook.value, passwordHook.value);
  };

  return (
    <>
    <h2>Log in </h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...usernameHook.input}/>
      </div>
      <div>
        password
        <input {...passwordHook.input}/>
      </div>
      <button type="submit">login</button>
    </form>
    </>
  );
};

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
};

export default Login;