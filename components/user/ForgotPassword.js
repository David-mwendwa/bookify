import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ButtonLoader from '../layout/ButtonLoader';
import { forgotPassword, clearErrors } from '../../redux/actions/userActions';
import Loader from '../layout/Loader';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      //TODO: this toast throws an error
      // toast.message(message);
    }
  }, [dispatch, email, error, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <div className='row wrapper'>
      <div className='col-10 col-lg-5'>
        <form className='shadow-lg' onSubmit={handleSubmit}>
          <h1 className='mb-3'>Forgot Password</h1>
          {message && (
            <div className='alert alert-success text-center'>{message}</div>
          )}
          <div className='form-group'>
            <label htmlFor='email_field'>Enter Email</label>
            <input
              type='email'
              id='email_field'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id='forgot_password_button'
            type='submit'
            className='btn btn-block py-3'
            disabled={loading ? true : false}>
            {loading ? <ButtonLoader /> : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
