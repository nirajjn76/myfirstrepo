import React from 'react';

interface CollapsedMenuProps {
  src: any
}

const CollapsedMenu: React.FC<CollapsedMenuProps> = ({ src }) => {
  return (
    <div className="menu-div">
      <img src={src} alt="menu" />
    </div>
  );
};

export default CollapsedMenu;
