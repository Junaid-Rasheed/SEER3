import React from 'react';
import { auth } from '../utils/firebaseClient';
import Layout from '../components/Layout';
import { GetServerSidePropsContext } from 'next';
import { Toaster } from 'react-hot-toast';
import ResetPassword from '../components/ResetPassword';
import { ActionMode } from '../model/auth';
import VerifiedEmail from '../components/VerifiedEmail';
import { applyActionCode } from 'firebase/auth';

const Verification = ({
  mode,
  oobCode,
  verifiedEmail
}: {
  mode: ActionMode;
  oobCode: string;
  verifiedEmail?: boolean;
}) => {
  return (
    <Layout>
      <div className="bg-black flex items-center justify-center">
        <div className="w-auto lg:w-96">
          {mode === ActionMode.PASSWORD_RESET && (
            <ResetPassword oobCode={oobCode} />
          )}
          {mode === ActionMode.VERIFY_EMAIL && (
            <VerifiedEmail verifiedEmail={verifiedEmail} />
          )}
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export const getServerSideProps = async ({
  query
}: GetServerSidePropsContext) => {
  if (!query?.mode || !query?.oobCode) {
    return {
      notFound: true
    };
  }

  if (query.mode === ActionMode.VERIFY_EMAIL) {
    try {
      await applyActionCode(auth, query.oobCode as string);
      return {
        props: {
          mode: query.mode,
          oobCode: query.oobCode,
          verifiedEmail: true
        }
      };
    } catch (err: any) {
      return {
        props: {
          mode: query.mode,
          oobCode: query.oobCode,
          verifiedEmail: false
        }
      };
    }
  }

  return {
    props: {
      mode: query.mode,
      oobCode: query.oobCode
    }
  };
};

export default Verification;
