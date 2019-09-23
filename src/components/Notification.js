import React from 'react';
import './Notification.css';

const Notification = ({message}) => {
  return (
    <div className='info-box'>
      <p>{message}</p>
    </div>
  )
};

export default Notification;