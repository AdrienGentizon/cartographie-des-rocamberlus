import React, { ChangeEvent, useState } from 'react';
import { useAuth } from '../../../contexts/UserProvider/UserProvider';

interface SignInFormInputs {
  email: undefined | string;
  password: undefined | string;
  passwordConfirmation: undefined | string;
}

export default function SigninForm() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [inputs, setInputs] = useState<SignInFormInputs>({
    email: undefined,
    password: undefined,
    passwordConfirmation: undefined,
  });
  const [error, setError] = useState<undefined | string>(undefined);

  const { signIn, signUp } = useAuth();

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => {
      const inputs = { ...prevInputs };
      inputs[
        `${event.target.name}` as 'email' | 'password' | 'passwordConfirmation'
      ] = event.target.value;
      return inputs;
    });
  };

  const validInputs = () => {
    const { email, password, passwordConfirmation } = inputs;
    setError('');
    const emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!email || !emailPattern.test(email)) {
      setError('Empty or invalid email.');
      return false;
    }
    if (!password) {
      setError('Password is empty.');
      return false;
    }
    if (!isRegistered && password !== passwordConfirmation) {
      setError('Password and confirmation mismatch.');
      return false;
    }
    return true;
  };

  const onSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    const { email, password, passwordConfirmation } = inputs;
    event.preventDefault();
    if (!validInputs()) return;
    if (!error && email && password) {
      try {
        setError(undefined);
        if (isRegistered) return await signIn(email, password);
        if (passwordConfirmation)
          return await signUp(email, password, passwordConfirmation);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <form action="" className="SignInForm" onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={onInputChange}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={onInputChange}
        required
      />
      {!isRegistered && (
        <>
          <label htmlFor="passwordConfirmation">Password onfirmation</label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            onChange={onInputChange}
            required
          />
        </>
      )}

      <p style={{ textAlign: 'center' }}>
        <button
          onClick={() => setIsRegistered(true)}
          style={{
            all: 'unset',
            textDecoration: isRegistered ? 'none' : 'underLine',
          }}
        >
          Sign In
        </button>{' '}
        or{' '}
        <button
          onClick={() => setIsRegistered(false)}
          style={{
            all: 'unset',
            textDecoration: !isRegistered ? 'none' : 'underLine',
          }}
        >
          Sign Up
        </button>
      </p>
      <input type="submit" value={isRegistered ? 'Sign In' : 'Sign Up'} />
      {error && <p className="error">{error}</p>}
    </form>
  );
}
