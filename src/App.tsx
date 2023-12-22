import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthRoutes, NonAuthRoutes, Roles } from './enums';
import AuthRoute from './components/Auth/AuthRoute';
import Dashboard from './pages/Dashboard';
import MyNetworkMapView from './pages/MyNetworkMapView';
import AddPort from './pages/AddPort';
import AddBandwidth from './pages/AddBandwidth';
import UserVerification from './pages/UserVerification';
import PortVerification from './pages/PortVerification';
import CrossConnectValidation from './pages/CrossConnectValidation';
import DeletePorts from './pages/DeletePorts';
import DeleteBandwidthPorts from './pages/DeleteBandwidthPorts';
import BandwidthPortsVerification from './pages/BandwidthPortsVerification';
import ManagePorts from './pages/ManagePorts';
import ManageBandwidth from './pages/ManageBandwidth';
import PortMarketPlace from './pages/PortMarketPlace';
import BandwidthMarketPlace from './pages/BandwidthMarketPlace';
import WXPay from './pages/WXPay';
import MarketPlaceMapView from './pages/MarketPlaceMapView';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import HttpInterceptor from './components/HttpInterceptor';
import './App.css';
import './assets/styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-modern-drawer/dist/index.css';

const App: React.FC = () => {
  return (
    <Router>
      <HttpInterceptor />
      <ToastContainer
        theme="dark"
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        draggable={false}
        closeButton={false}
        className="toast-container"
      />
      <Routes>
        <Route path={AuthRoutes.blank} element={<AuthRoute component={Dashboard} accessibleTo={Roles.user} url={AuthRoutes.blank} />} />
        <Route path={AuthRoutes.notDefinedRoute} element={<AuthRoute component={Dashboard} accessibleTo={Roles.user} />} />
        <Route path={NonAuthRoutes.login} element={<Login />} />
        <Route path={NonAuthRoutes.register} element={<Register />} />
        <Route path={AuthRoutes.dashboard} element={<AuthRoute component={Dashboard} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.addPort} element={<AuthRoute component={AddPort} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.addBandwidth} element={<AuthRoute component={AddBandwidth} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.userVerification} element={<AuthRoute component={UserVerification} accessibleTo={Roles.admin} />} />
        <Route path={AuthRoutes.portVerification} element={<AuthRoute component={PortVerification} accessibleTo={Roles.admin} />} />
        <Route path={AuthRoutes.bandwidthVerification} element={<AuthRoute component={BandwidthPortsVerification} accessibleTo={Roles.admin} />} />
        <Route path={AuthRoutes.managePorts} element={<AuthRoute component={ManagePorts} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.manageBandwidth} element={<AuthRoute component={ManageBandwidth} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.marketPlacePorts} element={<AuthRoute component={PortMarketPlace} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.marketPlaceBandwidth} element={<AuthRoute component={BandwidthMarketPlace} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.wxPay} element={<AuthRoute component={WXPay} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.marketPlaceBandwidthMap} element={<AuthRoute component={MarketPlaceMapView} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.myNetworkMapView} element={<AuthRoute component={MyNetworkMapView} accessibleTo={Roles.user} />} />
        <Route path={AuthRoutes.crossConnectValidation} element={<AuthRoute component={CrossConnectValidation} accessibleTo={Roles.admin} />} />
        <Route path={AuthRoutes.deletePorts} element={<AuthRoute component={DeletePorts} accessibleTo={Roles.admin} />} />
        <Route path={AuthRoutes.deleteBandwidthPorts} element={<AuthRoute component={DeleteBandwidthPorts} accessibleTo={Roles.admin} />} />
        <Route path={AuthRoutes.about} element={<AuthRoute component={About} accessibleTo={Roles.admin} />} />
      </Routes>
    </Router>
  );
};

export default App;
