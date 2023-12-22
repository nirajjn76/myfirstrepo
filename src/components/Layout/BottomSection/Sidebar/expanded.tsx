import React from 'react';
import ExpandedMenu from './expandedMenu';
import { Menus, MenuType } from '../../../../utils/appConstants';

const ExpandedSidebar: React.FC = () => {
  return (
    <div className="expanded-root" data-testid="expanded-sidebar">
      {
        Menus.map((menu: MenuType, index: number) => <ExpandedMenu key={index} menu={menu} />)
      }
    </div>
  );
};

export default ExpandedSidebar;
