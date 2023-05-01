import React from 'react';

const AllBookings = () => {
  return (
    <div>
      <div className='alert alert-danger'>
        All booking component emptied because of vercel deployment error
        <br />
        <small>
          {`The Serverless Function "admin/bookings" is 51.9mb which exceeds the
            maximum size limit of 50mb.`}
        </small>
      </div>
    </div>
  );
};

export default AllBookings;
