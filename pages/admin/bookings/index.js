import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../../components/layout/Layout';
import AllBookings from '../../../components/admin/AllBookings';

const AllAdminBookingsPage = () => {
  return (
    <Layout title='All bookings'>
      <AllBookings />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { req } = context;
  try {
    const session = await getSession({ req });
    console.log({ session });
    if (!session || session.user.role !== 'admin') {
      return { redirect: { destination: '/login', permanent: false } };
    }
    return { props: {} };
  } catch (error) {
    console.log(error);
  }
};

export default AllAdminBookingsPage;
