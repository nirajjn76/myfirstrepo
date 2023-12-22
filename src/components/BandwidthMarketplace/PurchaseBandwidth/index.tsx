import React from 'react';
import DrawerMenu from 'react-modern-drawer';
import PurchaseBandwidthForm from './PurchaseBandwidthForm';
import CloseBtn from '../../../assets/images/close-drawer.svg';

export interface PurchaseDrawerProps {
  open: boolean;
  loading: boolean;
  selectedRowForPurchase: any;
  values: any;
  onContractSelected: boolean;
  agreementSelected: {
    on_contract: boolean,
    on_demand: boolean
  };
  onDemandSelected: boolean;
  onContractPrice: string;
  onDemandPrice: string;
  selectedPrice: string;
  mapView?: boolean;
  onBackToListClick?: () => void;
  handlePurchaseClick: () => void;
  handleInputChange: (e: any) => void;
  handleAgreementSelected: (e: any) => void;
  onClose: () => void;
  onAggredTermsClick: (_: string) => void;
  onSelectedPriceChange: (_: string) => void;
}

const PurchaseDrawer: React.FC<PurchaseDrawerProps> = ({
  open, loading, onClose, onAggredTermsClick, onSelectedPriceChange, selectedPrice, mapView, onBackToListClick, agreementSelected, selectedRowForPurchase, values, onContractSelected, onDemandSelected, onContractPrice, onDemandPrice, handleAgreementSelected, handlePurchaseClick, handleInputChange,
}) => {
  const purchaseDisabled = !values.bandwidthDescription || !values.nePortName || !values.neServiceDescription || !values.fePortName || !values.feServiceDescription || !agreementSelected || !selectedPrice || (selectedPrice === 'on_contract' && !agreementSelected.on_contract) || (selectedPrice === 'on_demand' && !agreementSelected.on_demand);

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

      <PurchaseBandwidthForm
        agreementSelected={agreementSelected}
        loading={loading}
        onAggredTermsClick={onAggredTermsClick}
        onClose={onClose}
        onContractSelected={onContractSelected}
        onDemandSelected={onDemandSelected}
        onContractPrice={onContractPrice}
        onDemandPrice={onDemandPrice}
        disabled={!!purchaseDisabled}
        values={values}
        mapView={mapView}
        onBackToListClick={onBackToListClick}
        selectedPrice={selectedPrice}
        onSelectedPriceChange={onSelectedPriceChange}
        handleInputChange={handleInputChange}
        handlePurchaseClick={handlePurchaseClick}
        handleAgreementSelected={handleAgreementSelected}
        selectedRowForPurchase={selectedRowForPurchase}
      />
    </DrawerMenu>
  );
};

export default PurchaseDrawer;
