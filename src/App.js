import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />

          <PrivateRoute path="/order/:id" component={OrderScreen} />
          <PrivateRoute path="/shipping" component={ShippingScreen} />
          <PrivateRoute path="/payment" component={PaymentScreen} />
          <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />

          <AdminRoute path="/admin/userlist" component={UserListScreen} />
          <AdminRoute path="/admin/user/:id/edit" component={UserEditScreen} />
          <AdminRoute
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <AdminRoute
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <AdminRoute path="/admin/product/:id/edit" component={ProductEditScreen} />
          <AdminRoute path="/admin/orderlist" component={OrderListScreen} />

          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  </ErrorBoundary>
);

export default App;
