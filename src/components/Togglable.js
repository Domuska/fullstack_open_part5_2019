import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ children, toggleButtonLabel }) => {

  const [contentVisible, setContentVisible] = useState(false);

  const toggleButtonVisibility = { display: contentVisible ? `none` : `` };
  const contentVisibility = { display: contentVisible ? `` : `none` };

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };

  return (
    <div>
      <div style={toggleButtonVisibility}>
        <button onClick={toggleContentVisibility}>{toggleButtonLabel}</button>
      </div>
      <div style={contentVisibility}>
        {children}
        <button onClick={toggleContentVisibility}>Cancel</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  toggleButtonLabel: PropTypes.string.isRequired
};

export default Togglable;