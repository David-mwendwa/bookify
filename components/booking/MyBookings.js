import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { clearErrors } from '../../redux/actions/bookingActions';
import { MDBDataTable } from 'mdbreact';

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  const setBookings = () => {
    const data = {
      columns: [
        { label: 'Booking ID', field: 'id', sort: 'asc' },
        { label: 'check In', field: 'checkIn', sort: 'asc' },
        { label: 'Check Out', field: 'checkOut', sort: 'asc' },
        { label: 'Amount Paid', field: 'amount', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    bookings &&
      bookings.forEach((booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString('es-US'),
          checkOut: new Date(booking.checkOutDate).toLocaleString('es-US'),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link
                className='btn btn-primary'
                href={`/bookings/${booking._id}`}>
                <i className='fa fa-eye'></i>
              </Link>
              <button className='btn btn-success mx-2'>
                <i className='fa fa-download'></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <div className='container container-fluif'>
      <h1 className='my-5'>My Bookings</h1>

      <MDBDataTable
        data={setBookings()}
        className='px-3'
        bordered
        striped
        hover
      />
    </div>
  );
};

export default MyBookings;
