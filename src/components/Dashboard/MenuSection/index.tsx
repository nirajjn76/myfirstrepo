import React from 'react';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

interface MenuSectionProps {
  onNeOpen: () => void;
  selectNEOpen: boolean;
  selectedNes: any[],
  isDirty: boolean;
  handleSaveReset?: any;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  selectedNes, onNeOpen, selectNEOpen, isDirty, handleSaveReset,
}) => {
  return (
    <div className="menu-section-root">
      <div className="left-menus">
        <LeftSection selectedNes={selectedNes} onNeOpen={onNeOpen} selectNEOpen={selectNEOpen} isDirty={isDirty} handleSaveReset={handleSaveReset} />
      </div>
      <div className="right-menus">
        <RightSection />
      </div>
    </div>
  );
};

export default MenuSection;
