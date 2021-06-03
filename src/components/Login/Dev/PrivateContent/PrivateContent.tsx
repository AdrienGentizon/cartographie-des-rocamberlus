import React from 'react';
import { useAuth } from '../../../../contexts/UserProvider/UserProvider';

interface PrivateContentProps {
  message: string;
}

export default function PrivateContent({ message }: PrivateContentProps) {
  const { user } = useAuth();

  return (
    <div className="PrivateContent">
      <h3>This is Private</h3>
      <p>Nobody should see this except you {user?.email}</p>
      <p>{message}</p>
    </div>
  );
}
