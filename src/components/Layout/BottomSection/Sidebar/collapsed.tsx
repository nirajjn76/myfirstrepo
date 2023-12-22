import React, { useCallback } from 'react';
import { RoutesMapping, MenuTextMapping } from '../../../../utils/appConstants';
import AuthService from '../../../../services/auth.service';
import { Roles } from '../../../../enums';
import HomeSelected from '../../../../assets/images/home-selected.svg';
import Home from '../../../../assets/images/home.svg';
import AddNetworkResourceSelected from '../../../../assets/images/add-network-resource-selected.svg';
import AddNetworkResource from '../../../../assets/images/add-network-resource.svg';
import ManageAssetsSelected from '../../../../assets/images/manage-assets-selected.svg';
import ManageAssets from '../../../../assets/images/manage-assets.svg';
import MarketPlaceSelected from '../../../../assets/images/marketplace-selected.svg';
import MarketPlace from '../../../../assets/images/marketplace.svg';
import ValidationSelected from '../../../../assets/images/validation-selected.svg';
import Validation from '../../../../assets/images/validation.svg';
import WXPaySelected from '../../../../assets/images/wx-pay-selected.svg';
import WXPay from '../../../../assets/images/wx-pay.svg';
import AboutSelected from '../../../../assets/images/about-selected.svg';
import About from '../../../../assets/images/about.svg';
import CollapsedMenu from './collapsedMenu';

// interface CollapsedSidebarProps {
//   hovered: boolean;
// }

const CollapsedSidebar: React.FC = () => {
  const userRole = AuthService.getRole();
  const currentRoute = window.location.pathname;

  const getMenuIcon = useCallback((mainMenu) => {
    if (mainMenu === MenuTextMapping.home) {
      const selected = RoutesMapping.home.find((route) => route === currentRoute);

      if (selected) {
        return HomeSelected;
      }
      return Home;
    }

    if (mainMenu === MenuTextMapping.addNetworkResource) {
      const selected = RoutesMapping.addNetworkResource.find((route) => route === currentRoute);

      if (selected) {
        return AddNetworkResourceSelected;
      }
      return AddNetworkResource;
    }

    if (mainMenu === MenuTextMapping.validation) {
      const selected = RoutesMapping.validation.find((route) => route === currentRoute);

      if (selected) {
        return ValidationSelected;
      }
      return Validation;
    }

    if (mainMenu === MenuTextMapping.marketplace) {
      const selected = RoutesMapping.marketplace.find((route) => route === currentRoute);

      if (selected) {
        return MarketPlaceSelected;
      }
      return MarketPlace;
    }

    if (mainMenu === MenuTextMapping.manageAssets) {
      const selected = RoutesMapping.manageAssets.find((route) => route === currentRoute);

      if (selected) {
        return ManageAssetsSelected;
      }
      return ManageAssets;
    }

    if (mainMenu === MenuTextMapping.wxPay) {
      const selected = RoutesMapping.wxPay.find((route) => route === currentRoute);

      if (selected) {
        return WXPaySelected;
      }
      return WXPay;
    }

    if (mainMenu === MenuTextMapping.about) {
      const selected = RoutesMapping.about.find((route) => route === currentRoute);

      if (selected) {
        return AboutSelected;
      }
      return About;
    }
  }, [currentRoute]);

  return (
    <div className="collapsed-root" data-testid="collapsed-sidebar">
      <CollapsedMenu src={getMenuIcon(MenuTextMapping.home)} />
      <CollapsedMenu src={getMenuIcon(MenuTextMapping.addNetworkResource)} />
      <CollapsedMenu src={getMenuIcon(MenuTextMapping.manageAssets)} />
      <CollapsedMenu src={getMenuIcon(MenuTextMapping.marketplace)} />
      {userRole === Roles.admin && <CollapsedMenu src={getMenuIcon(MenuTextMapping.validation)} />}
      <CollapsedMenu src={getMenuIcon(MenuTextMapping.wxPay)} />
      {userRole === Roles.admin && <CollapsedMenu src={getMenuIcon(MenuTextMapping.about)} />}
    </div>
  );
};

export default CollapsedSidebar;
