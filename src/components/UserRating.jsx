import React from 'react';

const UserRating = ({userRating}) => {
  return (
    <div style={{
      width: 65,
      height: 65,
      borderRadius: '8px',
      backgroundColor: '#0091cf',
      color: 'white',
      fontWeight: 'bold',
      lineHeight: '1'
    }}
         className='d-flex flex-column justify-content-center align-items-center mt-1 mb-1'>
      <div>User</div>
      <div>Rating</div>
      <div>{userRating}</div>
    </div>
  );
};

export default UserRating;