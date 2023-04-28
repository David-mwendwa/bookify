import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { MDBDataTable } from 'mdbreact';
import { useRouter } from 'next/router';
import Loader from '../layout/Loader';
import {
  clearErrors,
  deletUser,
  getAdminUsers,
} from '../../redux/actions/userActions';
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';

const AllUsers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { users, loading, error } = useSelector((state) => state.allUsers);
  const { isDeleted, error: deleteError } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push('/admin/users');
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, isDeleted, deleteError]);

  const setUsers = () => {
    const data = {
      columns: [
        { label: 'User ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Email', field: 'email', sort: 'asc' },
        { label: 'Role', field: 'role', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    users &&
      users.forEach((user) => {
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link
                className='btn btn-primary'
                href={`/admin/users/${user._id}`}>
                <i className='fa fa-pencil'></i>
              </Link>
              <button
                className='btn btn-danger mx-2'
                onClick={() => handleDelete(user._id)}>
                <i className='fa fa-trash'></i>
              </button>
            </>
          ),
        });
      });

    return data;
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this user?')) {
      dispatch(deletUser(id));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container container-fluid'>
          <h1 className='my-5'>{`${users && users.length} Users`}</h1>

          <MDBDataTable
            data={setUsers()}
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

export default AllUsers;
