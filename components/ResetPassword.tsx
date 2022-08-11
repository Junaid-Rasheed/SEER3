import React, { useState } from 'react';
import Button from './Button';

const ResetPassword = ({
  onSubmit,
  loading
}: {
  onSubmit?: (data?: any) => void;
  loading?: boolean;
}) => {
  const [password, setPassword] = useState('');

  function handleChange(e: any) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (password) {
      onSubmit?.(password);
    }
  }
  return (
    <>
      <h2 className="heading text-white uppercase text-center">
        Reset password
      </h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <div>
          <label className="text-white">New password</label>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Enter new password"
            onChange={handleChange}
            value={password}
            required
            min={6}
            max={50}
          />
        </div>
        <Button type="submit" className="w-full mt-10" isLoading={loading}>
          Reset password
        </Button>
      </form>
    </>
  );
};

export default ResetPassword;
