import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ButtonLoader from '../layout/ButtonLoader';
import { register, clearErrors } from '../../redux/actions/userActions';
import useInput from '../../utils/useInput';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  );
  // const { values, handleChange: onChange } = useInput({
  //   avatar: '',
  //   avatarPreview: '/images/default_avatar.jpg',
  // });
  // let { avatar, avatarPreview } = values;
  // console.log('VALUES', { values });

  const { name, email, password } = user;

  const { success, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      router.push('/login');
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

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
    console.log({ userData });
    dispatch(register(userData));
  };

  return (
    <div className='container container-fluid'>
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={handleSubmit}>
            <h1 className='mb-3'>Join Us</h1>

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
                      name='avatarPreview'
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
              {loading ? <ButtonLoader /> : 'REGISTER'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
