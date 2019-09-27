import React from 'react';
import PropTypes from 'prop-types';

const Login = ({
  username,
  password,
  onLoginClick,
  handleUserNameChange,
  handlePasswordChange }) => {

  return (
    <>
    <h2>Log in </h2>
    <form onSubmit={onLoginClick}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUserNameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  handleUserNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};

export default Login;