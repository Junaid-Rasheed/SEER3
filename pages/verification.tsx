import React, { useState } from 'react';
import { auth } from '../utils/firebaseClient';
import Layout from '../components/Layout';
import { GetServerSidePropsContext } from 'next';
import toast, { Toaster } from 'react-hot-toast';
import ResetPassword from '../components/ResetPassword';
import { ActionMode } from '../model/auth';
import EmailVerification from '../components/EmailVerification';
import { useRouter } from 'next/router';
import { applyActionCode, confirmPasswordReset } from 'firebase/auth';
import { waitFor } from '../utils/common';

const Verification = ({
  mode,
  oobCode
}: {
  mode: ActionMode;
  oobCode: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAction(action: ActionMode, payload?: string) {
    setLoading(true);

    try {
      if (action === 'resetPassword' && payload) {
        await confirmPasswordReset(auth, oobCode, payload);
        toast.success('Password has been changed, you can login now');
      }
      if (action === 'verifyEmail') {
        await applyActionCode(auth, oobCode);
        toast.success('Email has been verified success');
      }
      await waitFor(1500);
      await router.push('/signin');
    } catch (err: any) {
      toast.error(err?.message || 'Error');
    } finally {
      setLoading(false);
    }
  }
  return (
    <Layout>
      <div className="bg-black flex items-center justify-center">
        <div className="w-auto lg:w-96">
          {mode === 'resetPassword' && (
            <ResetPassword
              onSubmit={(password: string) =>
                handleAction(ActionMode.PASSWORD_RESET, password)
              }
              loading={loading}
            />
          )}
          {mode === 'verifyEmail' && (
            <EmailVerification
              loading={loading}
              onSubmit={() => handleAction(ActionMode.VERIFY_EMAIL)}
            />
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

  return {
    props: {
      mode: query.mode,
      oobCode: query.oobCode
    }
  };
};

export default Verification;
