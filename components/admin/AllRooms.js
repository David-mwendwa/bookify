import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';
import moment from 'moment';
import { useRouter } from 'next/router';
import Loader from '../layout/Loader';
import {
  clearErrors,
  getAdminRooms,
  deleteRoom,
} from '../../redux/actions/roomActions';
import { DELETE_ROOM_RESET } from '../../redux/constants/roomConstants';

const AllRooms = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { rooms, loading, error } = useSelector((state) => state.allRooms);
  const { isDeleted, error: deleteError } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getAdminRooms());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push('/admin/rooms');
      dispatch({ type: DELETE_ROOM_RESET });
    }
  }, [dispatch, deleteError, isDeleted]);

  const setRooms = () => {
    const data = {
      columns: [
        { label: 'Room ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Price/Night', field: 'price', sort: 'asc' },
        { label: 'Category', field: 'category', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    rooms &&
      rooms.forEach((room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: `$${room.pricePerNight}`,
          category: room.category,
          actions: (
            <>
              <Link
                className='btn btn-primary'
                href={`/admin/rooms/${room._id}`}>
                <i className='fa fa-pencil'></i>
              </Link>
              <button
                className='btn btn-danger mx-2'
                onClick={() => handleDelete(room._id)}>
                <i className='fa fa-trash'></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete the room?')) {
      dispatch(deleteRoom(id));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container container-fluid'>
          <h1 className='my-5'>{`${rooms && rooms.length} Rooms`}</h1>

          <Link
            href='/admin/rooms/new'
            className='mt-0 btn text-white float-right new-room-btn'>
            Create Room
          </Link>

          <MDBDataTable
            data={setRooms()}
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

export default AllRooms;
