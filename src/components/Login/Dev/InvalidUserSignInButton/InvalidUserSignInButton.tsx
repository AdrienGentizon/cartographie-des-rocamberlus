import { MouseEvent } from 'react';
import { useAuth } from '../../../../contexts/UserProvider/UserProvider';

export default function InvalidUserSignInButton() {
  const { signIn } = useAuth();
  const onClick = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      await signIn('gst@gst.cm', '');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button type="button" style={{ width: '100%' }} onClick={onClick}>
      Invalid User
    </button>
  );
}
