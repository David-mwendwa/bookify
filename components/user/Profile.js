import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ButtonLoader from '../layout/ButtonLoader';
import {
  loadUser,
  updateProfile,
  clearErrors,
} from '../../redux/actions/userActions';
import { PROFILE_UPDATE_RESET } from '../../redux/constants/userConstants';
import Loader from '../layout/Loader';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  );

  const { name, email, password } = user;

  const {
    success,
    error,
    loading,
    user: currentUser,
  } = useSelector((state) => state.auth);
  const {
    updated,
    error: updateError,
    loading: updateLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name,
        email: currentUser.email,
      });
      setAvatarPreview(currentUser.avatar.url);
    } else dispatch(loadUser());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updated) {
      router.push('/');
      dispatch({ type: PROFILE_UPDATE_RESET });
    }
  }, [dispatch, success, error, router, user, updated, avatarPreview]);

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password, avatar };
    dispatch(updateProfile(userData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container container-fluid'>
          <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={handleSubmit}>
                <h1 className='mb-3'>Update Profile</h1>

                <div className='form-group'>
                  <label htmlFor='name_field'>Full Name</label>
                  <input
                    type='text'
                    id='name_field'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={handleChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email_field'>Email</label>
                  <input
                    type='email'
                    id='email_field'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={handleChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='password_field'>Password</label>
                  <input
                    type='password'
                    id='password_field'
                    className='form-control'
                    name='password'
                    value={password}
                    onChange={handleChange}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='avatar_upload'>Avatar</label>
                  <div className='d-flex align-items-center'>
                    <div>
                      <figure className='avatar mr-3 item-rtl'>
                        <img
                          src={avatarPreview}
                          className='rounded-circle'
                          alt='image'
                        />
                      </figure>
                    </div>
                    <div className='custom-file'>
                      <input
                        type='file'
                        name='avatar'
                        className='custom-file-input'
                        id='customFile'
                        accept='images/*'
                        onChange={handleChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id='login_button'
                  type='submit'
                  className='btn btn-block py-3'
                  disabled={loading ? true : false}>
                  {updateLoading ? <ButtonLoader /> : 'UPDATE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
