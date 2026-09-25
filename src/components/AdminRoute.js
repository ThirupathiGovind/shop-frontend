import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { userInfo, loading } = useSelector((state) => state.userLogin);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) return <Loader />;
        return userInfo && userInfo.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default AdminRoute;
