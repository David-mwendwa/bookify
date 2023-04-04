/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state.auth);
  console.log('AUTHSTATE', authstate);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <nav className='navbar row justify-content-center sticky-top'>
      <div className='container'>
        <div className='col-3 p-0'>
          <div className='navbar-brand'>
            <Link href='/'>
              <img
                style={{ cursor: 'pointer' }}
                src='./images/bookit_logo.png'
                alt='Bookify'
              />
            </Link>
          </div>
        </div>

        <div className='col-3 mt-3 mt-md-0 text-center'>
          <Link
            href='/login'
            className='btn btn-danger px-4 text-white login-header-btn float-right'>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
