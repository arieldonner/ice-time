import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import Navbar from '../components/navbar';
import { AppContext } from '../lib';

export default class AuthPage extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    return (
      <div>
        <Navbar action={route.path}/>
        <AuthForm
        key={route.path}
        action={route.path}
        onSignIn={handleSignIn} />
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
