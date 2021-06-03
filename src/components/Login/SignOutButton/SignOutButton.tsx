import { MouseEvent } from 'react';
import { useAuth } from '../../../contexts/UserProvider/UserProvider';

export default function SignOutButton() {
  const { signOut } = useAuth();

  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    await signOut();
  };

  return (
    <button onClick={onClick} style={{ width: '100%' }}>
      Sign out
    </button>
  );
}
