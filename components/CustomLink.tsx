import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  href?: string;
  openNewTab?: boolean;
  children: ReactNode;
  className?: string;
};
const CustomLink: FC<Props> = ({ href, children, className, openNewTab }) => {
  if (!href) {
    return <a className={className}>{children}</a>;
  }
  if (openNewTab) {
    return (
      <a href={href} target="_blank" className={className} rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default CustomLink;
