import React from 'react';
import DrawerMenu from 'react-modern-drawer';
import BandwidthList from './BandwidthList';
import BandwidthDetails from './BandwidthDetails';
import CloseBtn from '../../../assets/images/close-drawer.svg';

interface BandwidthListDrawerProps {
  open: boolean;
  onClose: () => void;
  neNames: {
    nneName: string,
    fneName: string
  };
  onDrawerContentChange: (content: 'list' | 'details', bandwidth?: any) => void;
  count: number;
  drawerContent: 'list' | 'details' | '';
  onSearchChange: (searchText: any) => void;
  onSearchClicked: (e: any) => void;
  loading: boolean;
  listBandwidths: {
    available: any[], consumed: any[], sold: any[]
  };
  searchText: string;
  bandwidthDetails: any;
}

const BandwidthListDrawer: React.FC<BandwidthListDrawerProps> = ({
  open, onClose, neNames, searchText, onDrawerContentChange, loading, drawerContent, count, listBandwidths, bandwidthDetails, onSearchChange, onSearchClicked,
}) => {
  return (
    <DrawerMenu
      overlayOpacity={0}
      className="my-network-bandwidth-drawer"
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

      {
        drawerContent === 'list'
          ? <BandwidthList search={searchText} onSearchClicked={onSearchClicked} neNames={neNames} loading={loading} count={count} listBandwidths={listBandwidths} onDrawerContentChange={onDrawerContentChange} onSearchChange={onSearchChange} />
          : <BandwidthDetails bandwidth={bandwidthDetails} onDrawerContentChange={onDrawerContentChange} isDirect={bandwidthDetails?.count === 1} />
      }
    </DrawerMenu>
  );
};

export default BandwidthListDrawer;
