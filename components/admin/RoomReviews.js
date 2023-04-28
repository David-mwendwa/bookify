import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MDBDataTable } from 'mdbreact';
import { useRouter } from 'next/router';
import Loader from '../layout/Loader';
import {
  clearErrors,
  deleteReview,
  getRoomReviews,
} from '../../redux/actions/roomActions';
import { DELETE_REVIEW_RESET } from '../../redux/constants/roomConstants';

const RoomReviews = () => {
  const [roomId, setRoomId] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { reviews, loading, error } = useSelector((state) => state.roomReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (roomId !== '') {
      dispatch(getRoomReviews(roomId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('Review is deleted!');
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, roomId, isDeleted, deleteError]);

  const setReviews = () => {
    const data = {
      columns: [
        { label: 'Review ID', field: 'id', sort: 'asc' },
        { label: 'Rating', field: 'rating', sort: 'asc' },
        { label: 'Comment', field: 'comment', sort: 'asc' },
        { label: 'User', field: 'user', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    reviews &&
      reviews.forEach((review) => {
        data.rows.push({
          id: review._id,
          rating: review.rating,
          comment: review.comment,
          user: review.name,
          actions: (
            <button
              className='btn btn-danger mx-2'
              onClick={() => handleDelete(review._id)}>
              <i className='fa fa-trash'></i>
            </button>
          ),
        });
      });

    return data;
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this review?')) {
      dispatch(deleteReview(id, roomId));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container container-fluid'>
          <div className='row justify-content-center mt-5'>
            <div className='col-5'>
              <form>
                <div className='form-group'>
                  <label htmlFor='roomId'>Enter Room ID</label>
                  <input
                    type='text'
                    id='roomId'
                    className='form-control'
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          {reviews && reviews.length > 0 ? (
            <MDBDataTable
              data={setReviews()}
              className='px-3'
              bordered
              striped
              hover
            />
          ) : (
            <div className='alert alert-danger mt-5 text-center'>
              No Reviews Found
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomReviews;
