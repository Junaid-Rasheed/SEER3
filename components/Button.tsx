import React, { FC } from 'react';
import Spinner from './Spinner';

type Props = {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};
const Button: FC<Props> = ({
  children,
  onClick,
  isLoading,
  className,
  type
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn flex items-center justify-center ${className}`}
      type={type || 'button'}
      disabled={isLoading}
    >
      {isLoading && <Spinner className="" />}
      {children}
    </button>
  );
};

export default Button;
