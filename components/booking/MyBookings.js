import React from 'react';

const MyBookings = () => {
  return (
    <div>
      <div className='alert alert-danger'>
        _my bookings_ component emptied because of vercel deployment error
        <br />
        <small>
          {`The Serverless Function "bookings/me" is 51.9mb which exceeds the
            maximum size limit of 50mb.`}
        </small>
      </div>
    </div>
  );
};

export default MyBookings;
