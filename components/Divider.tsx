import React from 'react';

const Divider = () => {
  return (
    <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-x-3">
      <hr />
      <span className="text-white">OR</span>
      <hr />
    </div>
  );
};

export default Divider;
