import React from 'react';
import Button from './Button';

const EmailVerification = ({
  onSubmit,
  loading
}: {
  onSubmit: () => void;
  loading?: boolean;
}) => {
  return (
    <div>
      <h3 className="text-white heading text-center">Verify email</h3>
      <Button isLoading={loading} onClick={onSubmit} className="mt-10">
        Verify account
      </Button>
    </div>
  );
};

export default EmailVerification;
