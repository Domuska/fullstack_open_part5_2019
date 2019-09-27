import React from 'react';
import PropTypes from 'prop-types';

import './Notification.css';

const Notification = ({ message }) => {
  return (
    <div className='info-box'>
      <p>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired
};

export default Notification;