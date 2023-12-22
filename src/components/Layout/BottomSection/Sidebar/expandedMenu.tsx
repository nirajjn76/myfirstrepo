import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  RoutesMapping, MenuTextMapping, MenuType, ChildMenuType,
} from '../../../../utils/appConstants';
import { Roles } from '../../../../enums';
import AuthService from '../../../../services/auth.service';

interface ExpandedMenuProps {
  menu: MenuType;
}

const ExpandedMenu: React.FC<ExpandedMenuProps> = ({ menu }) => {
  const navigate = useNavigate();
  const currentRoute = window.location.pathname;
  const userRole = AuthService.getRole();

  const selected = useMemo(() => {
    if (menu.id === MenuTextMapping.home) {
      const selected = RoutesMapping.home.find((route) => route === currentRoute);

      if (selected) {
        return true;
      }
      return false;
    }

    if (menu.id === MenuTextMapping.addNetworkResource) {
      const selected = RoutesMapping.addNetworkResource.find((route) => route === currentRoute);

      if (selected) {
        return true;
      }
      return false;
    }

    if (menu.id === MenuTextMapping.validation) {
      const selected = RoutesMapping.validation.find((route) => route === currentRoute);

      if (selected) {
        return true;
      }
      return false;
    }

    if (menu.id === MenuTextMapping.marketplace) {
      const selected = RoutesMapping.marketplace.find((route) => route === currentRoute);

      if (selected) {
        return true;
      }
      return false;
    }

    if (menu.id === MenuTextMapping.manageAssets) {
      const selected = RoutesMapping.manageAssets.find((route) => route === currentRoute);

      if (selected) {
        return true;
      }
      return false;
    }

    if (menu.id === MenuTextMapping.wxPay) {
      const selected = RoutesMapping.wxPay.find((route) => route === currentRoute);

      if (selected) {
        return true;
      }
      return false;
    }

    if (menu.id === MenuTextMapping.about) {
      const selected = RoutesMapping.about.find((route) => route === currentRoute);

      if (selected) {
        return true;
      }
      return false;
    }
  }, [menu, currentRoute]);

  const handleMenuClick = useCallback((url) => {
    navigate(url);
  }, [navigate]);

  return (
    <div className={clsx('menu-div', menu.accessibleTo === Roles.admin && userRole !== Roles.admin && 'hidden')} onClick={menu.redirectsTo ? () => handleMenuClick(menu.redirectsTo) : () => undefined}>
      <div className={clsx('menu-root', menu.disabled && 'disabled')}>
        <img src={selected && menu.selectedIcon ? menu.selectedIcon : menu.icon} alt={`${menu.text} icon`} />
        <label className={clsx('menu-parent-label', menu.disabled && 'disabled')}>{menu.text}</label>
      </div>

      <div className={clsx(menu.childMenus && 'child-menu-div')}>
        {
          menu.childMenus && menu.childMenus.map((childMenu: ChildMenuType, index: number) => {
            return (
              <div className="child-root" key={index} onClick={() => handleMenuClick(childMenu.redirectsTo)}>
                {childMenu.icon && <img src={childMenu.icon} alt={`${childMenu.text} icon`} /> }
                <label className={clsx('menu-child-label', !childMenu.icon && 'no-image')}>{childMenu.text}</label>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ExpandedMenu;
