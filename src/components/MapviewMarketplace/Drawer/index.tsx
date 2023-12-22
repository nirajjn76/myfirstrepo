import React from 'react';
import DrawerMenu from 'react-modern-drawer';
import BandwidthList from './BandwidthList';
import CloseBtn from '../../../assets/images/close-drawer.svg';

interface PurchaseDrawerProps {
  open: boolean;
  onClose: () => void;
  drawerContent: 'list' | 'purchase' | '';
  onDrawerContentChange: (content: 'list' | 'purchase', bandwidth?: any) => void;
  data: any[];
  onFilterChange: (filter: string) => void;
  listOptions: any[];
  filter: string;
  searchText: string;
  onSearchChange: (e: any) => void;
  neNames: any;
  loading: boolean;
}

const PurchaseDrawer: React.FC<PurchaseDrawerProps> = ({
  open, data, onClose, drawerContent, onDrawerContentChange, onFilterChange, listOptions, filter, searchText, onSearchChange, neNames, loading,
}) => {
  return (
    <DrawerMenu
      overlayOpacity={0}
      className="purchase-bandwidth-drawer"
      open={open}
      onClose={onClose}
      duration={100}
      direction="right"
    >
      <div
        className="close-drawer-btn"
        onClick={onClose}
      >
        <img src={CloseBtn} alt="Close Drawer" />
      </div>

      <BandwidthList neNames={neNames} onFilterChange={onFilterChange} loading={loading} listOptions={listOptions} filter={filter} data={data} onDrawerContentChange={onDrawerContentChange} searchText={searchText} onSearchChange={onSearchChange} />
    </DrawerMenu>
  );
};

export default PurchaseDrawer;
