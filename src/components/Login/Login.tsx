import React from 'react';
import Dev from './Dev/Dev';

import SigninForm from './SigninForm/SigninForm';

export default function Login() {
  return (
    <div className="Login">
      <div className="Login__container">
        <SigninForm />
        <Dev />
      </div>
    </div>
  );
}
