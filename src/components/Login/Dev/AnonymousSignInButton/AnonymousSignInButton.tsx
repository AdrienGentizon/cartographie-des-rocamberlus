import { MouseEvent } from 'react';
import { useAuth } from '../../../../contexts/UserProvider/UserProvider';

export default function AnonymousSignInButton() {
  const { signInAnonymously } = useAuth();
  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      await signInAnonymously();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button type="button" style={{ width: '100%' }} onClick={onClick}>
      Anonyme
    </button>
  );
}
