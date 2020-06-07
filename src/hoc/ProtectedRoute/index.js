import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RootContext } from '../../context/RootContext';

export default ({ children, ...routeProps }) => {

  const { authToken } = useContext(RootContext);

  return (
    <Route
      {...routeProps}
      render={() => (authToken ?
        (
          children
        ) :
        <Redirect to='/login' />)
      }
    />
  );
};