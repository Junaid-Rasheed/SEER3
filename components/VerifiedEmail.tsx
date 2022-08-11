import React from 'react';

const VerifiedEmail = ({ verifiedEmail }: { verifiedEmail?: boolean }) => {
  if (!verifiedEmail) {
    return (
      <div>
        <h3 className="text-red-400">Verify email failed</h3>
        <p className="text-white">Please try again!</p>
      </div>
    );
  }
  return <h3 className="text-white ">Your email has been verified success!</h3>;
};

export default VerifiedEmail;
