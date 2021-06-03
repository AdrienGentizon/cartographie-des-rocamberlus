import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardLinkProps {
  to: string;
  name: string;
}

export default function DashboardLink({ to, name }: DashboardLinkProps) {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        textAlign: 'center',
        paddingTop: '1rem',
      }}
    >
      {name}
    </Link>
  );
}
