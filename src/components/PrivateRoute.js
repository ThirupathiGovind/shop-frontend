import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userInfo, loading } = useSelector((state) => state.userLogin);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) return <Loader />;
        return userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', search: `?redirect=${props.location.pathname}` }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
