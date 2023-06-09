import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomItem from './room/RoomItem';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { clearErrors } from '../redux/actions/roomActions';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home = () => {
  const dispatch = useDispatch();
  let router = useRouter();

  const { rooms, resultsPerPage, roomsCount, filteredRoomsCount, error } =
    useSelector((state) => state.allRooms);

  let { page = 1, location } = router.query;
  page = Number(page);

  const handlePagination = (pageNumber) => {
    window.location.href = `/?page=${pageNumber}`;
  };

  let count = roomsCount;
  if (location) {
    count = filteredRoomsCount;
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      <section id='rooms' className='container mt-5'>
        <h2 className='mb-3 ml-2 stays-heading'>
          {location ? `Rooms in ${location}` : 'All Rooms'}
        </h2>

        <Link href='/search' className='ml-2 back-to-search'>
          {' '}
          <i className='fa fa-arrow-left'></i> Back to Search
        </Link>
        <div className='row'>
          {rooms?.length === 0 ? (
            <div className='alert alert-info w-100 text-center'>
              No Rooms Found
            </div>
          ) : (
            rooms &&
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </section>
      {resultsPerPage < count && (
        <div className='d-flex justify-content-center mt-5'>
          <Pagination
            activePage={page}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={count}
            onChange={handlePagination}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
      )}
    </>
  );
};

export default Home;
