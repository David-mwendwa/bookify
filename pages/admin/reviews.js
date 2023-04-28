import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../components/layout/Layout';
import RoomReviews from '../../components/admin/RoomReviews';

const RoomReviewsPage = () => {
  return (
    <Layout title='Room reviews'>
      <RoomReviews />
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

export default RoomReviewsPage;
