import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Loader from '../layout/Loader';
import {
  getAdminBookings,
  clearErrors,
  deleteBooking,
} from '../../redux/actions/bookingActions';
import { MDBDataTable } from 'mdbreact';
import easyinvoice from 'easyinvoice';
import moment from 'moment';
import { useRouter } from 'next/router';
import { DELETE_BOOKING_RESET } from '../../redux/constants/bookingConstants';

const AllBookings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { bookings, error, loading } = useSelector((state) => state.bookings);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(getAdminBookings());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      router.push('/admin/bookings');
      dispatch({ type: DELETE_BOOKING_RESET });
    }
  }, [dispatch, deleteError, isDeleted]);

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
                href={`/admin/bookings/${booking._id}`}>
                <i className='fa fa-eye'></i>
              </Link>
              <button
                className='btn btn-success mx-2'
                onClick={() => downloadInvoice(booking)}>
                <i className='fa fa-download'></i>
              </button>
              <button
                className='btn btn-danger mx-2'
                onClick={() => handleDelete(booking._id)}>
                <i className='fa fa-trash'></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const downloadInvoice = async (booking) => {
    const data = {
      documenTitle: 'RECEIPT',
      customize: {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
      },
      images: {
        logo: 'https://res.cloudinary.com/techdave/image/upload/v1681210002/bookify/bookit_logo_cz1fkr.png',
      },
      // Your own data
      sender: {
        company: 'Bookify',
        address: '9th Street. Moi avenue',
        zip: '1234',
        city: 'Nairobi',
        country: 'Kenya',
      },
      // Your recipient
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: '4567 CD',
        country: `Kenya`,
        custom1: `Check In: ${moment(booking.checkInDate).format(
          'DD MMM YYYY hh:mm'
        )}`,
        custom2: `Check Out: ${moment(booking.checkOutDate).format(
          'DD MMM YYYY hh:mm'
        )}`,
      },
      information: {
        // Invoice number
        number: `${booking._id}`,
        // Invoice data
        date: `${moment().format('DD MMM YYYY')}`,
        'due-date': `${moment().format('DD MMM YYYY')}`,
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          'tax-rate': 6,
          price: `${booking.room.pricePerNight}`,
        },
      ],
      // The message you would like to display on the bottom of your invoice
      'bottom-notice':
        'This is auto generated Invoice of your booking on Bookify',
      // Settings to customize your invoice
      settings: {
        currency: 'USD',
      },
    };

    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete the room?'))
      dispatch(deleteBooking(id));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container container-fluif'>
          <h1 className='my-5'>{`${bookings && bookings.length} Bookings`}</h1>

          <MDBDataTable
            data={setBookings()}
            className='px-3'
            bordered
            striped
            hover
          />
        </div>
      )}
    </>
  );
};

export default AllBookings;
