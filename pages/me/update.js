import React from 'react';
import { getSession } from 'next-auth/react';
import Layout from '../../components/layout/Layout';
import Profile from '../../components/user/Profile';

const UpdateProfilePage = () => {
  return (
    <Layout title='update profile'>
      <Profile />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { req } = context;
  try {
    const session = await getSession({ req });
    console.log({ session });
    if (!session) return { redirect: { destination: '/login', permanent: false } };
    return { props: { session } };
  } catch (error) {
    console.log(error);
  }
};

// // TODO: on user update the session becomes null
// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }

export default UpdateProfilePage;
